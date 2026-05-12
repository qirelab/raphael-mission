import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDonationPage } from '../../../context/DonationPageContext';
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
  description_en: '', description_ru: '', description_pl: '',
  image_url: '',
  back_button_en: '', back_button_ru: '', back_button_pl: '',
};

const DonationEditor = () => {
  const navigate = useNavigate();
  const { pageData, loading, error: ctxError, updatePage } = useDonationPage();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewLang, setPreviewLang] = useState('en');

  useEffect(() => {
    if (!pageData) return;
    const sanitized = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, pageData[k] ?? ''])
    );
    setFormData(sanitized);
  }, [pageData]);

  // Resolve a localized preview value with English fallback so the preview is
  // never blank just because one language was left empty.
  const previewValue = (base) => {
    const localized = formData[`${base}_${previewLang}`];
    if (localized && localized.trim() !== '') return localized;
    return formData[`${base}_en`] || '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updatePage(formData);
      success('Страница «Пожертвование» обновлена!', 'Сохранено');
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
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">
          Страница «Пожертвование»
        </h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Редактируйте заголовок, описание, изображение и текст кнопки «Назад» публичной страницы «Пожертвование».
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
              Предосмотр блока
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

          {/* Preview canvas — повторяет публичную верстку страницы */}
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight font-poppins text-gray-900">
                  {previewValue('title') || 'Advance the Mission Through Your Gift'}
                </h2>
                {previewValue('description') && (
                  <p className="mt-3 text-sm sm:text-base text-gray-600 font-poppins max-w-[520px]">
                    {previewValue('description')}
                  </p>
                )}
                <div className="mt-5">
                  <span className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium font-poppins">
                    ← {previewValue('back_button') || 'Back to donation details'}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={formData.image_url || '/images/money.jpg'}
                  alt="Donation preview"
                  className="block w-full h-auto max-h-[260px] object-contain rounded-[12px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====================== TEXT FIELDS ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Контент</h2>
          </div>

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
              type="input"
              placeholder="Например: Продвигайте миссию через ваш дар"
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
              rows={4}
              placeholder="Описание под заголовком"
            />

            <MultilingualInput
              label="Текст кнопки «Назад»"
              fieldName="back_button"
              values={{
                en: formData.back_button_en,
                ru: formData.back_button_ru,
                pl: formData.back_button_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: Вернуться к деталям пожертвования"
            />
          </div>
        </section>

        {/* ====================== IMAGE ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Изображение</h2>
          </div>

          <ImageUpload
            currentImage={formData.image_url}
            onImageUpload={handleImageUpload}
            folder="donation"
            label="Изображение блока"
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

export default DonationEditor;
