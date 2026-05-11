import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProjectsHero } from '../../../context/ProjectsHeroContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import ImageUpload from '../../../components/ImageUpload';
import MultilingualInput from '../../../components/MultilingualInput';
import FlagUS from '../../../components/icons/FlagUS';
import FlagRU from '../../../components/icons/FlagRU';
import FlagPL from '../../../components/icons/FlagPL';

const PREVIEW_LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', FlagComponent: FlagUS },
  { code: 'ru', label: 'RU', name: 'Русский', FlagComponent: FlagRU },
  { code: 'pl', label: 'PL', name: 'Polski', FlagComponent: FlagPL },
];

const EMPTY_FORM = {
  title_en: '', title_ru: '', title_pl: '',
  bible_quote_en: '', bible_quote_ru: '', bible_quote_pl: '',
  bible_source_en: '', bible_source_ru: '', bible_source_pl: '',
  description_en: '', description_ru: '', description_pl: '',
  background_image_url: '',
};

const ProjectsHeroEditor = () => {
  const navigate = useNavigate();
  const { heroData, loading, error: ctxError, updateHero } = useProjectsHero();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewLang, setPreviewLang] = useState('en');

  // Resolve a localized preview value with English fallback so the preview is
  // never blank just because one language was left empty.
  const previewValue = (base) => {
    const localized = formData[`${base}_${previewLang}`];
    if (localized && localized.trim() !== '') return localized;
    return formData[`${base}_en`] || '';
  };
  const previewTitleFallback = {
    en: 'Our Projects',
    ru: 'Наши проекты',
    pl: 'Nasze projekty',
  };

  useEffect(() => {
    if (!heroData) return;
    const sanitized = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, heroData[k] ?? ''])
    );
    setFormData(sanitized);
  }, [heroData]);

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
      success('Hero-блок страницы «Проекты» обновлён!', 'Сохранено');
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
          to="/admin/projects"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2F7D6D] transition-colors font-poppins"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          К списку проектов
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">
          Hero-блок страницы «Проекты»
        </h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Редактируйте заголовок, библейскую цитату, описание и фоновое изображение верхнего блока публичной страницы «Проекты».
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700 font-poppins">
              Предпросмотр Hero-блока
            </p>
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

          {/* Preview canvas */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url('${
                  formData.background_image_url || '/images/projects.png'
                }')`,
              }}
            />
            <div className="absolute inset-0 bg-[rgba(18,60,52,0.6)] z-10" />
            <div className="relative z-20 w-full px-6 py-10 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins">
                {previewValue('title') || previewTitleFallback[previewLang]}
              </h2>
              {(previewValue('bible_quote') || previewValue('bible_source')) && (
                <div className="mt-3">
                  <blockquote className="italic text-base sm:text-lg font-poppins">
                    {previewValue('bible_quote')}
                  </blockquote>
                  <cite className="block text-xs sm:text-sm opacity-90 mt-1 not-italic font-poppins">
                    {previewValue('bible_source')}
                  </cite>
                </div>
              )}
              {previewValue('description') && (
                <p className="mt-4 text-sm sm:text-base max-w-2xl mx-auto opacity-95 font-poppins">
                  {previewValue('description')}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ====================== CONTENT FIELDS ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Текст</h2>
          </div>

          <div className="space-y-6">
            <MultilingualInput
              label="Заголовок страницы"
              fieldName="title"
              values={{
                en: formData.title_en,
                ru: formData.title_ru,
                pl: formData.title_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: Наши проекты"
            />

            <MultilingualInput
              label="Библейская цитата (курсив)"
              fieldName="bible_quote"
              values={{
                en: formData.bible_quote_en,
                ru: formData.bible_quote_ru,
                pl: formData.bible_quote_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={3}
              placeholder="«Я пришёл, чтобы вы имели жизнь...»"
            />

            <MultilingualInput
              label="Источник цитаты"
              fieldName="bible_source"
              values={{
                en: formData.bible_source_en,
                ru: formData.bible_source_ru,
                pl: formData.bible_source_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Иисус (Иоанна 10:10)"
            />

            <MultilingualInput
              label="Описание страницы"
              fieldName="description"
              values={{
                en: formData.description_en,
                ru: formData.description_ru,
                pl: formData.description_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
              placeholder="Краткое описание под цитатой"
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
            folder="projects-hero"
            label="Фон Hero-блока"
          />
        </section>

        {/* ====================== ACTIONS ====================== */}
        <div className="sticky bottom-4 z-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <p className="flex-1 text-sm text-gray-600 font-poppins">
              Изменения сразу появятся на публичной странице после сохранения.
            </p>
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
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

export default ProjectsHeroEditor;
