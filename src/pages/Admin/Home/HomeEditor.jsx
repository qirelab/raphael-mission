import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomePage } from '../../../context/HomePageContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import MultilingualInput from '../../../components/MultilingualInput';
import ImageUpload from '../../../components/ImageUpload';
import FlagUS from '../../../components/icons/FlagUS';
import FlagRU from '../../../components/icons/FlagRU';
import FlagPL from '../../../components/icons/FlagPL';

const PREVIEW_LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', FlagComponent: FlagUS },
  { code: 'ru', label: 'RU', name: 'Русский', FlagComponent: FlagRU },
  { code: 'pl', label: 'PL', name: 'Polski', FlagComponent: FlagPL },
];

// Field groups — one card per section. Adding/removing a field is a one-line change.
const SECTIONS = [
  {
    key: 'hero',
    title: 'Верхний блок',
    subtitle: 'Заголовок с подсветкой, описание, кнопки и логотип.',
    fields: [
      { name: 'hero_title', label: 'Заголовок', type: 'input' },
      { name: 'hero_title_highlight', label: 'Подсвеченная часть заголовка', type: 'input' },
      { name: 'hero_description', label: 'Описание', type: 'textarea', rows: 4 },
      { name: 'hero_btn_support', label: 'Кнопка «Поддержать миссию»', type: 'input' },
      { name: 'hero_btn_learn_more', label: 'Кнопка «Узнать больше»', type: 'input' },
    ],
  },
  {
    key: 'mission',
    title: 'Секция «Наши Цели»',
    subtitle: 'Заголовок секции, описание и 3 карточки.',
    fields: [
      { name: 'mission_title', label: 'Заголовок секции', type: 'input' },
      { name: 'mission_description', label: 'Описание секции', type: 'textarea', rows: 3 },
      { name: 'card1_title', label: 'Карточка 1: заголовок', type: 'input' },
      { name: 'card1_desc', label: 'Карточка 1: описание', type: 'textarea', rows: 3 },
      { name: 'card2_title', label: 'Карточка 2: заголовок', type: 'input' },
      { name: 'card2_desc', label: 'Карточка 2: описание', type: 'textarea', rows: 3 },
      { name: 'card3_title', label: 'Карточка 3: заголовок', type: 'input' },
      { name: 'card3_desc', label: 'Карточка 3: описание', type: 'textarea', rows: 3 },
    ],
  },
  {
    key: 'projects',
    title: 'Секция «Наши проекты» (заголовок)',
    subtitle: 'Карточки проектов редактируются в разделе «Проекты».',
    fields: [
      { name: 'projects_title', label: 'Заголовок секции', type: 'input' },
      { name: 'projects_description', label: 'Описание секции', type: 'textarea', rows: 3 },
    ],
  },
  {
    key: 'support',
    title: 'Секция «Поддержите нашу миссию» (заголовок)',
    fields: [
      { name: 'support_title', label: 'Заголовок секции', type: 'input' },
      { name: 'support_description', label: 'Описание секции', type: 'textarea', rows: 3 },
    ],
  },
  {
    key: 'testimonies',
    title: 'Секция «Свидетельства» (заголовок)',
    subtitle: 'Карточки свидетельств редактируются в разделе «Свидетельства».',
    fields: [
      { name: 'testimonies_title', label: 'Заголовок секции', type: 'input' },
      { name: 'testimonies_description', label: 'Описание секции', type: 'textarea', rows: 3 },
    ],
  },
  {
    key: 'contact',
    title: 'Секция «Свяжитесь с нами»',
    subtitle:
      'Сами адрес/телефон/email редактируются в «Контактная информация». Здесь — заголовок секции, описание и подписи к иконкам.',
    fields: [
      { name: 'contact_title', label: 'Заголовок секции', type: 'input' },
      { name: 'contact_description', label: 'Описание секции', type: 'textarea', rows: 3 },
      { name: 'label_address', label: 'Лейбл «Адрес»', type: 'input' },
      { name: 'label_phone', label: 'Лейбл «Телефон»', type: 'input' },
      { name: 'label_email', label: 'Лейбл «Email»', type: 'input' },
    ],
  },
  {
    key: 'contact_form',
    title: 'Форма обратной связи',
    subtitle: 'Заголовок формы и плейсхолдеры полей.',
    fields: [
      { name: 'form_title', label: 'Заголовок формы / кнопка отправки', type: 'input' },
      { name: 'ph_first_name', label: 'Плейсхолдер «Имя»', type: 'input' },
      { name: 'ph_last_name', label: 'Плейсхолдер «Фамилия»', type: 'input' },
      { name: 'ph_email', label: 'Плейсхолдер «Email»', type: 'input' },
      { name: 'ph_subject', label: 'Плейсхолдер «Тема»', type: 'input' },
      { name: 'ph_message', label: 'Плейсхолдер «Сообщение»', type: 'textarea', rows: 2 },
    ],
  },
];

const ALL_FIELDS = SECTIONS.flatMap((s) => s.fields.map((f) => f.name));
const LANGS = ['en', 'ru', 'pl'];

const EMPTY_FORM = {
  ...Object.fromEntries(
    ALL_FIELDS.flatMap((name) => LANGS.map((lang) => [`${name}_${lang}`, '']))
  ),
  logo_url: '',
};

// Returns a mini-faithful canvas of the public section, driven by `pv(base)` —
// a closure that resolves the value for the currently selected preview language.
// Centralised here so the JSX of <HomeEditor /> stays readable.
function renderSectionPreview(key, pv, logo) {
  switch (key) {
    case 'hero':
      return (
        <div className="bg-[#1e222d] rounded-lg px-5 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <img
              src={logo}
              alt="Logo preview"
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain flex-shrink-0"
            />
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-poppins leading-tight mb-2">
                <span>{pv('hero_title') || 'Our mission is to preach the'} </span>
                <span className="text-[#3b8a79]">{pv('hero_title_highlight') || 'Gospel'}</span>
              </h2>
              {pv('hero_description') && (
                <p className="text-sm text-white/90 font-poppins leading-relaxed mb-3">
                  {pv('hero_description')}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                <span className="inline-block bg-[#2F7D6D] text-white px-4 py-1.5 rounded-lg font-semibold font-poppins text-xs">
                  {pv('hero_btn_support') || 'Support Our Mission'}
                </span>
                <span className="inline-block bg-transparent text-white border-2 border-[#3b8a79] px-4 py-1.5 rounded-lg font-semibold font-poppins text-xs">
                  {pv('hero_btn_learn_more') || 'Learn More'}
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'mission':
      return (
        <div className="bg-[#e5e7eb] rounded-lg px-5 py-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2937] font-poppins mb-2">
              {pv('mission_title') || 'Our Goals'}
            </h2>
            {pv('mission_description') && (
              <p className="text-sm text-[#374151] font-poppins">{pv('mission_description')}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-[#3c8a7a] rounded-xl p-4 shadow-sm flex flex-col items-center text-center"
              >
                <h3 className="text-sm sm:text-base font-semibold text-white font-poppins mb-2">
                  {pv(`card${idx}_title`) || `Card ${idx} title`}
                </h3>
                <p className="text-xs text-[#e5e7eb] font-['Open_Sans']">
                  {pv(`card${idx}_desc`) || 'Card description...'}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="bg-white rounded-lg px-5 py-6 text-center border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2937] font-poppins mb-2">
            {pv('projects_title') || 'Our Projects'}
          </h2>
          {pv('projects_description') && (
            <p className="text-sm text-[#4b5563] font-poppins max-w-2xl mx-auto">
              {pv('projects_description')}
            </p>
          )}
          <p className="mt-4 text-xs text-gray-400 italic font-poppins">
            ↓ Карточки проектов подгружаются динамически из «Проекты» ↓
          </p>
        </div>
      );

    case 'support':
      return (
        <div className="bg-[#3c8a7a] rounded-lg px-5 py-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-2">
            {pv('support_title') || 'Support Our Mission'}
          </h2>
          {pv('support_description') && (
            <p className="text-sm text-white/90 font-poppins max-w-2xl mx-auto mb-5">
              {pv('support_description')}
            </p>
          )}
          <div className="flex flex-wrap gap-2 justify-center">
            {/* 'PayPal' временно скрыт (оплата не работает) — вернуть в массив, когда заработает. */}
            {['Stripe', 'Fondy'].map((label) => (
              <span
                key={label}
                className="inline-block bg-white text-gray-700 px-4 py-1.5 rounded-lg font-semibold font-poppins text-xs shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      );

    case 'testimonies':
      return (
        <div className="bg-white rounded-lg px-5 py-6 text-center border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] font-poppins mb-2">
            {pv('testimonies_title') || 'Testimonies'}
          </h2>
          {pv('testimonies_description') && (
            <p className="text-sm text-[#4b5563] font-poppins max-w-2xl mx-auto">
              {pv('testimonies_description')}
            </p>
          )}
          <p className="mt-4 text-xs text-gray-400 italic font-poppins">
            ↓ Карточки свидетельств подгружаются из «Свидетельства» ↓
          </p>
        </div>
      );

    case 'contact':
      return (
        <div className="bg-[#3c8a7a] rounded-lg px-5 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-2">
            {pv('contact_title') || 'Contact Us'}
          </h2>
          {pv('contact_description') && (
            <p className="text-sm text-[#dcfce7] font-poppins mb-5 max-w-2xl">
              {pv('contact_description')}
            </p>
          )}
          <ul className="space-y-2 text-sm font-poppins">
            {[
              { base: 'label_address', fallback: 'Address' },
              { base: 'label_phone', fallback: 'Phone' },
              { base: 'label_email', fallback: 'Email' },
            ].map((row) => (
              <li key={row.base} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/80" />
                <span className="text-white font-semibold">
                  {pv(row.base) || row.fallback}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'contact_form':
      return (
        <div className="bg-[#3c8a7a] rounded-lg px-5 py-8">
          <div className="bg-white rounded-xl p-5 shadow-sm max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-semibold text-[#1f2937] font-poppins mb-3">
              {pv('form_title') || 'Send Message'}
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 font-poppins">
                  {pv('ph_first_name') || 'First Name'}
                </div>
                <div className="border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 font-poppins">
                  {pv('ph_last_name') || 'Last Name'}
                </div>
              </div>
              <div className="border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 font-poppins">
                {pv('ph_email') || 'Email Address'}
              </div>
              <div className="border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 font-poppins">
                {pv('ph_subject') || 'Subject'}
              </div>
              <div className="border border-gray-200 rounded px-3 py-4 text-xs text-gray-400 font-poppins">
                {pv('ph_message') || 'Your Message'}
              </div>
              <div className="bg-[#3c8a7a] text-white text-center rounded px-3 py-2 text-xs font-semibold font-poppins">
                {pv('form_title') || 'Send Message'}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

const HomeEditor = () => {
  const navigate = useNavigate();
  const { pageData, loading, error: ctxError, updatePage } = useHomePage();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Each section owns its own preview language so editors can compare different
  // languages side-by-side without losing the others' state.
  const [previewLangs, setPreviewLangs] = useState(() =>
    Object.fromEntries(SECTIONS.map((s) => [s.key, 'en']))
  );

  useEffect(() => {
    if (!pageData) return;
    const sanitized = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, pageData[k] ?? ''])
    );
    setFormData(sanitized);
  }, [pageData]);

  const setSectionLang = (sectionKey, lang) => {
    setPreviewLangs((prev) => ({ ...prev, [sectionKey]: lang }));
  };

  // Build a per-section value resolver with English fallback so the preview is
  // never blank just because one language was left empty.
  const makeSectionPv = (sectionKey) => (base) => {
    const lang = previewLangs[sectionKey] || 'en';
    const localized = formData[`${base}_${lang}`];
    if (localized && localized.trim() !== '') return localized;
    return formData[`${base}_en`] || '';
  };

  const previewLogo = useMemo(
    () => (formData.logo_url && formData.logo_url.trim()) || '/images/img_logo_2.png',
    [formData.logo_url]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (url) => {
    setFormData((prev) => ({ ...prev, logo_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updatePage(formData);
      success('Главная страница обновлена!', 'Сохранено');
    } catch (err) {
      showError(err.message || 'Не удалось сохранить изменения', t('alertSaveError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Главная страница</h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Редактируйте статический контент главной страницы для всех языков (EN, RU, PL).
        </p>
      </div>

      {ctxError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{ctxError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ====================== SECTIONS WITH INLINE PREVIEWS ====================== */}
        {SECTIONS.map((section) => {
          const sectionLang = previewLangs[section.key] || 'en';
          const sectionPv = makeSectionPv(section.key);

          return (
            <section
              key={section.key}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Section header */}
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
                  <h2 className="text-xl font-bold text-gray-900 font-poppins">{section.title}</h2>
                </div>
                {section.subtitle && (
                  <p className="text-sm text-gray-500 font-poppins ml-4">{section.subtitle}</p>
                )}
              </div>

              {/* Inline live preview for this section — with its own language switcher */}
              <div className="border-y border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 pt-3 pb-2">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-poppins">
                    Предпросмотр
                  </p>
                  <div className="flex gap-2">
                    {PREVIEW_LANGUAGES.map((lang) => {
                      const Flag = lang.FlagComponent;
                      const active = sectionLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => setSectionLang(section.key, lang.code)}
                          aria-label={`Предпросмотр на ${lang.name}`}
                          className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg font-poppins text-sm font-medium
                            transition-all duration-200 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-[#2F7D6D] focus:ring-offset-1
                            ${
                              active
                                ? 'bg-[#2F7D6D] text-white shadow-md ring-2 ring-[#2F7D6D] ring-offset-1'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-[#2F7D6D]'
                            }
                          `}
                        >
                          {Flag && <Flag className="w-5 h-3.5" />}
                          {lang.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="pb-4 px-2 sm:px-4">
                  {renderSectionPreview(section.key, sectionPv, previewLogo)}
                </div>
              </div>

              {/* Form fields */}
              <div className="p-6 space-y-6">
                {section.fields.map((field) => (
                  <MultilingualInput
                    key={field.name}
                    label={field.label}
                    fieldName={field.name}
                    values={{
                      en: formData[`${field.name}_en`],
                      ru: formData[`${field.name}_ru`],
                      pl: formData[`${field.name}_pl`],
                    }}
                    onChange={handleChange}
                    type={field.type}
                    rows={field.rows}
                  />
                ))}

                {/* Logo upload — only inside the Hero section */}
                {section.key === 'hero' && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500 font-poppins mb-3">
                      Загрузите изображение логотипа или оставьте пустым, чтобы использовать
                      дефолтный <code className="text-xs">/images/img_logo_2.png</code>.
                    </p>
                    <ImageUpload
                      currentImage={formData.logo_url}
                      onImageUpload={handleLogoUpload}
                      folder="home"
                      label="Логотип"
                    />
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* ====================== ACTIONS ====================== */}
        <div className="sticky bottom-4 z-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <p className="flex-1 text-sm text-gray-600 font-poppins">
              Изменения сразу появятся на публичной странице после сохранения.
            </p>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 font-poppins"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#2F7D6D] text-white font-semibold rounded-lg hover:bg-[#266b5a] disabled:opacity-50 disabled:cursor-not-allowed font-poppins shadow-sm transition-colors"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomeEditor;
