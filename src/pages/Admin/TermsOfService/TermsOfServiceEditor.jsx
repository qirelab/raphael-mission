import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTermsOfService } from '../../../context/TermsOfServiceContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import MultilingualInput from '../../../components/MultilingualInput';

// All editable fields, grouped logically. Each group renders one card; the
// list of fields drives both the form state and the rendering — adding /
// removing a field is a one-line change.
const SECTIONS = [
  {
    key: 'hero',
    title: 'Верхний блок',
    subtitle: 'Заголовок и подзаголовок в верхнем зелёном блоке.',
    fields: [
      { name: 'hero_title', label: 'Заголовок страницы', type: 'input' },
      { name: 'hero_subtitle', label: 'Подзаголовок', type: 'input' },
    ],
  },
  {
    key: 'section1',
    title: 'Секция 1',
    fields: [
      { name: 'section1_title', label: 'Заголовок', type: 'input' },
      { name: 'section1_content', label: 'Контент', type: 'textarea', rows: 5 },
    ],
  },
  {
    key: 'section2',
    title: 'Секция 2',
    fields: [
      { name: 'section2_title', label: 'Заголовок', type: 'input' },
      { name: 'section2_content', label: 'Контент', type: 'textarea', rows: 5 },
    ],
  },
  {
    key: 'section3',
    title: 'Секция 3 (со списком)',
    fields: [
      { name: 'section3_title', label: 'Заголовок', type: 'input' },
      { name: 'section3_content', label: 'Контент', type: 'textarea', rows: 3 },
      { name: 'section3_item1', label: 'Пункт списка 1', type: 'input' },
      { name: 'section3_item2', label: 'Пункт списка 2', type: 'input' },
      { name: 'section3_item3', label: 'Пункт списка 3', type: 'input' },
    ],
  },
  {
    key: 'section4',
    title: 'Секция 4',
    fields: [
      { name: 'section4_title', label: 'Заголовок', type: 'input' },
      { name: 'section4_content', label: 'Контент', type: 'textarea', rows: 5 },
    ],
  },
  {
    key: 'section5',
    title: 'Секция 5',
    fields: [
      { name: 'section5_title', label: 'Заголовок', type: 'input' },
      { name: 'section5_content', label: 'Контент', type: 'textarea', rows: 5 },
    ],
  },
  {
    key: 'section6',
    title: 'Секция 6',
    fields: [
      { name: 'section6_title', label: 'Заголовок', type: 'input' },
      { name: 'section6_content', label: 'Контент', type: 'textarea', rows: 5 },
    ],
  },
  {
    key: 'contact',
    title: 'Блок контактов',
    subtitle: 'Блок «Вопросы» внизу страницы.',
    fields: [
      { name: 'contact_title', label: 'Заголовок', type: 'input' },
      { name: 'contact_content', label: 'Контент', type: 'textarea', rows: 3 },
    ],
  },
];

const ALL_FIELDS = SECTIONS.flatMap((s) => s.fields.map((f) => f.name));
const LANGS = ['en', 'ru', 'pl'];

const EMPTY_FORM = Object.fromEntries(
  ALL_FIELDS.flatMap((name) => LANGS.map((lang) => [`${name}_${lang}`, '']))
);

const TermsOfServiceEditor = () => {
  const navigate = useNavigate();
  const { pageData, loading, error: ctxError, updatePage } = useTermsOfService();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!pageData) return;
    const sanitized = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, pageData[k] ?? ''])
    );
    setFormData(sanitized);
  }, [pageData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updatePage(formData);
      success('Страница «Terms of Service» обновлена!', 'Сохранено');
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
          Страница «Условия использования»
        </h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Редактируйте все блоки публичной страницы «Условия использования».
        </p>
      </div>

      {ctxError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{ctxError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {SECTIONS.map((section) => (
          <section
            key={section.key}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
              <h2 className="text-xl font-bold text-gray-900 font-poppins">{section.title}</h2>
            </div>
            {section.subtitle && (
              <p className="text-sm text-gray-500 font-poppins mb-6 ml-4">{section.subtitle}</p>
            )}

            <div className={`space-y-6 ${section.subtitle ? '' : 'mt-6'}`}>
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
            </div>
          </section>
        ))}

        {/* Actions */}
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

export default TermsOfServiceEditor;
