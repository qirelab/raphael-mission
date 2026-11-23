import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTestimoniesHero } from '../../../context/TestimoniesHeroContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import ImageUpload from '../../../components/ImageUpload';
import MultilingualInput from '../../../components/MultilingualInput';
import FlagUS from '../../../components/icons/FlagUS';
import FlagRU from '../../../components/icons/FlagRU';
import FlagPL from '../../../components/icons/FlagPL';
import ViewportPreview from '../../../components/ui/ViewportPreview';
import TestimoniesHero from '../../Testimonies/TestimoniesHero';
import { translations } from '../../../locales/translations';

const PREVIEW_LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', FlagComponent: FlagUS },
  { code: 'ru', label: 'RU', name: 'Русский', FlagComponent: FlagRU },
  { code: 'pl', label: 'PL', name: 'Polski', FlagComponent: FlagPL },
];

const PREVIEW_WIDTHS = [
  { width: 1920, label: '1920' },
  { width: 1440, label: '1440' },
  { width: 1280, label: '1280' },
  { width: 390, label: 'Телефон' },
];

const EMPTY_FORM = {
  // Hero block
  title_en: '', title_ru: '', title_pl: '',
  title_highlight_en: '', title_highlight_ru: '', title_highlight_pl: '',
  description_en: '', description_ru: '', description_pl: '',
  background_image_url: '',

  // Share Your Story block (bottom green section)
  share_title_en: '', share_title_ru: '', share_title_pl: '',
  share_description_en: '', share_description_ru: '', share_description_pl: '',
  share_button_en: '', share_button_ru: '', share_button_pl: '',
};

const TestimoniesHeroEditor = () => {
  const navigate = useNavigate();
  const { heroData, loading, error: ctxError, updateHero } = useTestimoniesHero();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewLang, setPreviewLang] = useState('en');
  const [previewWidth, setPreviewWidth] = useState(1440);
  const [sharePreviewLang, setSharePreviewLang] = useState('en');

  useEffect(() => {
    if (!heroData) return;
    const sanitized = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, heroData[k] ?? ''])
    );
    setFormData(sanitized);
  }, [heroData]);

  // Same fallback chain as the public page: field in the preview language →
  // English field → built-in translation for the preview language.
  const previewValue = (base, translationKey) => {
    const localized = formData[`${base}_${previewLang}`];
    if (localized && localized.trim() !== '') return localized;
    const englishFallback = formData[`${base}_en`];
    if (englishFallback && englishFallback.trim() !== '') return englishFallback;
    return translations[previewLang]?.[translationKey] || '';
  };
  // Independent picker for the Share Your Story preview.
  const sharePreviewValue = (base) => {
    const localized = formData[`${base}_${sharePreviewLang}`];
    if (localized && localized.trim() !== '') return localized;
    return formData[`${base}_en`] || '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, background_image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateHero(formData);
      success('Hero-блок страницы «Свидетельства» обновлён!', 'Сохранено');
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
      {/* Breadcrumb / back link */}
      <div className="mb-4">
        <Link
          to="/admin/testimonies"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2F7D6D] transition-colors font-poppins"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          К списку свидетельств
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">
          Страница «Свидетельства»
        </h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Редактируйте верхний (Hero) и нижний (Поделиться историей) блоки публичной страницы «Свидетельства».
        </p>
      </div>

      {ctxError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{ctxError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ====================== LIVE PREVIEW ====================== */}
        <section className="rounded-xl shadow-sm overflow-hidden border border-gray-100 bg-white">
          {/* Language switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50">
            <div>
              <p className="text-sm font-semibold text-gray-700 font-poppins">
                Предосмотр блока
              </p>
              <p className="text-xs text-gray-500 font-poppins">
                Так блок выглядит на сайте при выбранной ширине экрана
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PREVIEW_WIDTHS.map(({ width, label }) => {
                const active = previewWidth === width;
                return (
                  <button
                    key={width}
                    type="button"
                    onClick={() => setPreviewWidth(width)}
                    aria-label={`Ширина экрана ${width} px`}
                    title={`${width} px`}
                    className={`
                      px-3 py-1.5 rounded-lg font-poppins text-sm font-medium
                      transition-all duration-200 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-[#2F7D6D] focus:ring-offset-1
                      ${
                        active
                          ? 'bg-[#2F7D6D] text-white shadow-md ring-2 ring-[#2F7D6D] ring-offset-1'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-[#2F7D6D]'
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              {PREVIEW_LANGUAGES.map((lang) => {
                const Flag = lang.FlagComponent;
                const active = previewLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setPreviewLang(lang.code)}
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

          {/* Preview canvas — тот же компонент, что и на публичной странице */}
          <div className="bg-gray-100">
            <ViewportPreview width={previewWidth} lang={previewLang} title="Предпросмотр Hero-блока">
              <TestimoniesHero
                headingAs="h2"
                title={previewValue('title', 'testimoniesPageTitle')}
                titleHighlight={previewValue('title_highlight', 'testimoniesPageTitleHighlight')}
                description={previewValue('description', 'testimoniesPageDescription')}
                background={formData.background_image_url}
              />
            </ViewportPreview>
          </div>
        </section>

        {/* ====================== TEXT FIELDS ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Верхний блок</h2>
          </div>

          <p className="text-sm text-gray-500 font-poppins mb-6 ml-4">
            Длинный заголовок переносится сам. Чтобы задать перенос в нужном месте, нажмите Enter —
            новая строка будет и на сайте. Проверьте результат в предосмотре на ширинах 1280 и 1920.
          </p>

          <div className="space-y-6">
            <MultilingualInput
              label="Заголовок"
              fieldName="title"
              values={{
                en: formData.title_en,
                ru: formData.title_ru,
                pl: formData.title_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={2}
              placeholder="Например: Истории веры и"
            />

            <MultilingualInput
              label="Выделенная часть заголовка"
              fieldName="title_highlight"
              values={{
                en: formData.title_highlight_en,
                ru: formData.title_highlight_ru,
                pl: formData.title_highlight_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={2}
              placeholder="Например: преобразования"
            />

            <MultilingualInput
              label="Описание"
              fieldName="description"
              values={{
                en: formData.description_en,
                ru: formData.description_ru,
                pl: formData.description_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={3}
              placeholder="Подзаголовок под заголовком"
            />
          </div>
        </section>

        {/* ====================== BACKGROUND IMAGE ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Фоновое изображение</h2>
          </div>

          <ImageUpload
            currentImage={formData.background_image_url}
            onImageUpload={handleImageUpload}
            folder="testimonies-hero"
            label="Фон блока"
          />
        </section>

        {/* ====================== SHARE YOUR STORY PREVIEW ====================== */}
        <section className="rounded-xl shadow-sm overflow-hidden border border-gray-100 bg-white">
          {/* Language switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700 font-poppins">
              Предосмотр блока
            </p>
            <div className="flex gap-2">
              {PREVIEW_LANGUAGES.map((lang) => {
                const Flag = lang.FlagComponent;
                const active = sharePreviewLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setSharePreviewLang(lang.code)}
                    aria-label={`Предпросмотр «Поделиться историей» на ${lang.name}`}
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

          {/* Preview canvas — повторяет публичную верстку Share Your Story (зелёный фон) */}
          <div className="bg-[#2F7D6D] text-white px-6 py-12 sm:py-14 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins max-w-2xl mx-auto">
              {sharePreviewValue('share_title') || 'Share Your Story'}
            </h3>
            {sharePreviewValue('share_description') && (
              <p className="mt-3 text-sm sm:text-base max-w-3xl mx-auto opacity-95 font-poppins">
                {sharePreviewValue('share_description')}
              </p>
            )}
            <div className="mt-6 flex justify-center">
              <span className="inline-block px-6 py-3 rounded-lg bg-white text-[#2F7D6D] font-semibold font-poppins text-sm sm:text-base shadow-sm">
                {sharePreviewValue('share_button') || 'Share Your Story'}
              </span>
            </div>
          </div>
        </section>

        {/* ====================== SHARE YOUR STORY FIELDS ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Нижний блок</h2>
          </div>
          <p className="text-sm text-gray-500 font-poppins mb-6 ml-4">
            Зелёный блок внизу страницы «Свидетельства» — приглашение поделиться историей.
          </p>

          <div className="space-y-6">
            <MultilingualInput
              label="Заголовок"
              fieldName="share_title"
              values={{
                en: formData.share_title_en,
                ru: formData.share_title_ru,
                pl: formData.share_title_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: Поделитесь своей историей"
            />

            <MultilingualInput
              label="Описание"
              fieldName="share_description"
              values={{
                en: formData.share_description_en,
                ru: formData.share_description_ru,
                pl: formData.share_description_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
              placeholder="Текст под заголовком"
            />

            <MultilingualInput
              label="Текст кнопки"
              fieldName="share_button"
              values={{
                en: formData.share_button_en,
                ru: formData.share_button_ru,
                pl: formData.share_button_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: Поделиться историей"
            />
          </div>
        </section>

        {/* ====================== ACTIONS ====================== */}
        <div className="sticky bottom-4 z-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <p className="flex-1 text-sm text-gray-600 font-poppins">
              Изменения сразу появятся на публичной странице после сохранения.
            </p>
            <button
              type="button"
              onClick={() => navigate('/admin/testimonies')}
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

export default TestimoniesHeroEditor;
