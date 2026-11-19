import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

/**
 * Builds the chat assistant's knowledge base from live site content (DB).
 * Content editors change texts in the admin panel → the bot picks them up
 * after the cache TTL, no redeploy needed.
 */

const KNOWLEDGE_TTL_SECONDS = 300;
const MAX_FIELD_CHARS = 3000;

// Columns that are UI chrome (labels, placeholders, buttons), not knowledge
const SKIP_COLUMN = /^(ph_|label_)|btn|button|image|_url|gallery/;

const stripHtml = (value) =>
  String(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const clean = (value) => {
  if (value === null || value === undefined) return '';
  const text = stripHtml(value);
  return text.length > MAX_FIELD_CHARS ? `${text.slice(0, MAX_FIELD_CHARS)}…` : text;
};

/** Localized field with English / unsuffixed fallback */
const pick = (row, base, lang) =>
  clean(row?.[`${base}_${lang}`] || row?.[`${base}_en`] || row?.[base]);

const queryRows = async (sql) => {
  try {
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    // A missing table must not take the whole chat down
    logger.warn(`Chat knowledge: query failed (${sql}): ${error.message}`);
    return [];
  }
};

/**
 * Generic formatter for single-row "page" tables (about, home, legal pages):
 * walks the localized columns in schema order, turning *title* columns into
 * headings and everything else into paragraphs.
 */
const formatPageRow = (row, lang) => {
  if (!row) return '';
  const suffix = `_${lang}`;
  const seen = new Set();
  const lines = [];

  for (const [key, raw] of Object.entries(row)) {
    if (!key.endsWith(suffix)) continue;
    const base = key.slice(0, -suffix.length);
    if (SKIP_COLUMN.test(base)) continue;

    const value = pick(row, base, lang);
    if (!value || seen.has(value)) continue;
    seen.add(value);

    lines.push(/title/.test(base) ? `#### ${value}` : value);
  }
  return lines.join('\n');
};

const section = (title, body) => (body && body.trim() ? `## ${title}\n${body.trim()}` : '');

const buildProjects = (rows, lang) =>
  rows
    .map((p) => {
      const stats = [pick(p, 'stat1', lang), pick(p, 'stat2', lang), pick(p, 'stat3', lang)]
        .filter(Boolean)
        .join('; ');
      return [
        `### ${pick(p, 'title', lang)}`,
        `Page: [${pick(p, 'title', lang)}](/${lang}/projects/${p.slug})`,
        pick(p, 'description', lang),
        pick(p, 'about_project', lang) && `About: ${pick(p, 'about_project', lang)}`,
        pick(p, 'what_we_do', lang) && `What we do: ${pick(p, 'what_we_do', lang)}`,
        pick(p, 'impact_title', lang) &&
          `${pick(p, 'impact_title', lang)}: ${pick(p, 'impact_description', lang)}`,
        stats && `Key facts: ${stats}`,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

// stock_quantity is deliberately not passed to the bot: the admin panel has no
// field for it (it stays at the default 0), so it made the bot tell visitors
// that paintings were out of stock.
const buildShop = (rows, lang) =>
  rows
    .map((p) =>
      [
        `### ${pick(p, 'name', lang)}`,
        `Price: ${p.price} ${p.currency || 'USD'}`,
        pick(p, 'description', lang),
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n\n');

const buildContact = (c, lang) => {
  if (!c) return '';
  const address = [
    pick(c, 'address_line1', lang),
    pick(c, 'address_line2', lang),
    pick(c, 'city', lang),
    pick(c, 'country', lang),
  ]
    .filter(Boolean)
    .join(', ');
  return [
    c.phone_number && `Phone: ${c.phone_number}`,
    c.email && `Email: ${c.email}`,
    address && `Address: ${address}`,
  ]
    .filter(Boolean)
    .join('\n');
};

const buildTestimonies = (rows, lang) =>
  rows
    .map((t) => {
      const name = pick(t, 'name', lang) || clean(t.name);
      const text = pick(t, 'content', lang);
      // Full text (clean() caps it): truncated stories made the model invent their endings
      return text ? `### ${name}\n${text}` : '';
    })
    .filter(Boolean)
    .join('\n\n');

/**
 * Facts that live in frontend code rather than the DB.
 * Keep in sync with src/components/payment/* and Footer.
 */
const staticFacts = (lang) => `## How to donate
Donation page: [donate](/${lang}/donate)
Payment options on the donation page:
- Fondy (best for Poland, Ukraine and Eastern Europe): Visa, Mastercard, Maestro, local Polish banks, BLIK, bank transfers. Direct link: [donate via Fondy](/${lang}/donate?method=fondy)
- Stripe (international cards, many currencies): [donate via Stripe](/${lang}/donate?method=stripe)
- PayPal is temporarily unavailable.
The visitor chooses the amount on the payment provider's page.
Card and payment details are entered on the secure page of the payment provider (Fondy or Stripe), not on the mission's website; the website itself does not process or store card data.
Recurring (monthly) donations, minimum amounts, crypto, bank account details for direct transfer and donation receipts are NOT described on the site: refer these questions to the team.
Refunds: according to the site's Terms of service, donations are voluntary and non-refundable, except where required by law. If someone donated by mistake or has a payment problem, they should contact the team, who will look into it.

## Shop
The [shop page](/${lang}/shop) is a catalogue of original handmade paintings. Buying a painting is a way to support the mission: the money helps spread the Gospel and respond to people's needs.
There is no online cart or checkout on the site: to buy a painting, the visitor contacts the mission (email, phone, the contact form or the "Write to the team" button in this chat) and the team arranges payment and delivery.
The site does not track availability: only the team can confirm it. Never say a painting is sold or unavailable.
Visitors can ask the team for more photos or details of a painting.

## Social media
- [Instagram](https://www.instagram.com/i.m.raphael)
- [Telegram channel](https://t.me/+3S7xzFVZtJ0xNDY0)

## Site pages
- [Home](/${lang})
- [About the mission](/${lang}/about-mission)
- [Projects](/${lang}/projects)
- [Testimonies](/${lang}/testimonies) (visitors can share their own story there)
- [Shop](/${lang}/shop)
- [Donate](/${lang}/donate)
- [Contacts](/${lang}/contact)
- [Contact form](/${lang}#contact)
- [Privacy policy](/${lang}/privacy-policy), [Terms of service](/${lang}/terms-of-service), [Cookie policy](/${lang}/cookie-policy)`;

export const chatKnowledgeService = {
  async get(lang = 'en') {
    const cacheKey = `chat:knowledge:${lang}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    const [
      [home],
      [about],
      projects,
      [projectsHero],
      [donation],
      [contact],
      products,
      [shopHero],
      testimonies,
      [privacy],
      [terms],
      [cookies],
    ] = await Promise.all([
      queryRows('SELECT * FROM home_page ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM about_page ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM projects WHERE is_active = true ORDER BY created_at DESC'),
      queryRows('SELECT * FROM projects_hero ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM donation_page ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM contact_info ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM shop_products WHERE is_active = true ORDER BY created_at DESC'),
      queryRows('SELECT * FROM shop_hero ORDER BY id DESC LIMIT 1'),
      queryRows(
        'SELECT * FROM testimonies WHERE is_approved = true ORDER BY created_at DESC LIMIT 10'
      ),
      queryRows('SELECT * FROM privacy_policy ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM terms_of_service ORDER BY id DESC LIMIT 1'),
      queryRows('SELECT * FROM cookie_policy ORDER BY id DESC LIMIT 1'),
    ]);

    const knowledge = [
      section('Contacts', buildContact(contact, lang)),
      section('About the mission', formatPageRow(about, lang)),
      section('Home page', formatPageRow(home, lang)),
      section('Projects overview', formatPageRow(projectsHero, lang)),
      section('Projects', buildProjects(projects, lang)),
      section('Donation page', formatPageRow(donation, lang)),
      staticFacts(lang),
      section('Shop intro', formatPageRow(shopHero, lang)),
      section('Shop products', buildShop(products, lang)),
      section('Testimonies (real stories)', buildTestimonies(testimonies, lang)),
      section('Privacy policy', formatPageRow(privacy, lang)),
      section('Terms of service', formatPageRow(terms, lang)),
      section('Cookie policy', formatPageRow(cookies, lang)),
    ]
      .filter(Boolean)
      .join('\n\n');

    await cacheService.set(cacheKey, knowledge, KNOWLEDGE_TTL_SECONDS);
    return knowledge;
  },
};
