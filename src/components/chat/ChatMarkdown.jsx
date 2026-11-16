import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Minimal, safe Markdown renderer for chat answers.
 * Supports paragraphs, bullet/numbered lists, **bold**, [links](url) and bare URLs.
 * Builds React elements only (no innerHTML), so model output can't inject markup.
 */

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/)/i;
// 1-2: [text](url) | 3: **bold** | 4: bare http(s) URL or bare internal path like /ru/donate
// (models occasionally emit "( /ru/donate)" or plain paths despite instructions)
// 5: email → mailto: | 6: international phone number → tel:
const INLINE =
  /\[([^\]]+)\]\(\s*([^)\s]+)\s*\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+[^\s).,!?;:]|(?<![\w/])\/(?:en|ru|pl)(?:[/?#][^\s)]*[^\s).,!?;:])?(?![\w/]))|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\+\d[\d\s()-]{7,}\d)/g;

const ChatLink = ({ href, children, onNavigate }) => {
  if (!SAFE_URL.test(href)) return <>{children}</>;

  const className = 'underline font-medium text-[#2F7D6D] hover:text-[#1f5a4e] break-words';

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }
  if (/^(mailto|tel):/i.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};

const renderInline = (text, onNavigate, keyPrefix, labelFor) => {
  const nodes = [];
  let lastIndex = 0;
  let match;
  // Fresh regex per call: renderInline recurses for bold text, and a shared /g regex
  // would have its lastIndex clobbered by the inner call
  const inline = new RegExp(INLINE.source, 'g');

  while ((match = inline.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const key = `${keyPrefix}-${match.index}`;

    if (match[1]) {
      nodes.push(
        <ChatLink key={key} href={match[2]} onNavigate={onNavigate}>
          {match[1]}
        </ChatLink>
      );
    } else if (match[3]) {
      // Bold may wrap a phone/email/link: render its content inline too
      nodes.push(<strong key={key}>{renderInline(match[3], onNavigate, key, labelFor)}</strong>);
    } else if (match[5]) {
      nodes.push(
        <ChatLink key={key} href={`mailto:${match[5]}`}>
          {match[5]}
        </ChatLink>
      );
    } else if (match[6]) {
      nodes.push(
        <ChatLink key={key} href={`tel:${match[6].replace(/[^\d+]/g, '')}`}>
          {match[6]}
        </ChatLink>
      );
    } else if (match[4]) {
      // Bare internal paths get a readable label ("/ru#contact" → "Контакты")
      const label = (match[4].startsWith('/') && labelFor?.(match[4])) || match[4];
      nodes.push(
        <ChatLink key={key} href={match[4]} onNavigate={onNavigate}>
          {label}
        </ChatLink>
      );
    }
    lastIndex = inline.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};

const BULLET = /^\s*[-*•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;

const ChatMarkdown = ({ text, onNavigate, labelFor }) => {
  const blocks = [];
  let list = null;

  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };

  text.split('\n').forEach((rawLine) => {
    // Headings are rendered as bold lines: chat bubbles are too small for <h*>
    const line = rawLine.replace(/^#{1,6}\s+(.*)$/, '**$1**');
    const bullet = line.match(BULLET);
    const numbered = !bullet && line.match(NUMBERED);

    if (bullet || numbered) {
      const type = bullet ? 'ul' : 'ol';
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
      return;
    }

    flushList();
    if (line.trim()) blocks.push({ type: 'p', text: line });
  });
  flushList();

  return (
    <div className="space-y-2 text-sm leading-relaxed break-words">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return <p key={i}>{renderInline(block.text, onNavigate, i, labelFor)}</p>;
        }
        const ListTag = block.type;
        return (
          <ListTag
            key={i}
            className={`${block.type === 'ul' ? 'list-disc' : 'list-decimal'} pl-5 space-y-1`}
          >
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item, onNavigate, `${i}-${j}`, labelFor)}</li>
            ))}
          </ListTag>
        );
      })}
    </div>
  );
};

export default ChatMarkdown;
