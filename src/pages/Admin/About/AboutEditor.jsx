import React, { useEffect, useState } from 'react';
import { useAbout } from '../../../context/AboutContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import ImageUpload from '../../../components/ImageUpload';
import MultilingualInput from '../../../components/MultilingualInput';

const EMPTY_FORM = {
  hero_title_en: '', hero_title_ru: '', hero_title_pl: '',

  hero_paragraph1_en: '', hero_paragraph1_ru: '', hero_paragraph1_pl: '',
  hero_paragraph2_en: '', hero_paragraph2_ru: '', hero_paragraph2_pl: '',
  hero_paragraph3_en: '', hero_paragraph3_ru: '', hero_paragraph3_pl: '',
  hero_paragraph4_en: '', hero_paragraph4_ru: '', hero_paragraph4_pl: '',
  hero_paragraph5_en: '', hero_paragraph5_ru: '', hero_paragraph5_pl: '',

  hero_image_url: '',

  values_title_en: '', values_title_ru: '', values_title_pl: '',
  values_desc_en:  '', values_desc_ru:  '', values_desc_pl:  '',

  value1_title_en: '', value1_title_ru: '', value1_title_pl: '',
  value1_desc_en:  '', value1_desc_ru:  '', value1_desc_pl:  '',

  value2_title_en: '', value2_title_ru: '', value2_title_pl: '',
  value2_desc_en:  '', value2_desc_ru:  '', value2_desc_pl:  '',

  value3_title_en: '', value3_title_ru: '', value3_title_pl: '',
  value3_desc_en:  '', value3_desc_ru:  '', value3_desc_pl:  '',
};

const AboutEditor = () => {
  const { aboutData, loading, error: ctxError, updateAbout } = useAbout();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!aboutData) return;
    // Replace nulls coming from the API with empty strings so React inputs stay
    // controlled and the "filled languages" indicators behave correctly.
    const sanitized = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, aboutData[k] ?? ''])
    );
    setFormData(sanitized);
  }, [aboutData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, hero_image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateAbout(formData);
      success('Страница "О нас" успешно обновлена!', 'Сохранено');
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
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Страница «О нас»</h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Редактируйте содержимое публичной страницы «О нас» для всех языков (EN, RU, PL).
        </p>
      </div>

      {ctxError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{ctxError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ====================== HERO SECTION ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Верхний блок</h2>
          </div>

          <div className="space-y-6">
            <MultilingualInput
              label="Заголовок"
              fieldName="hero_title"
              values={{
                en: formData.hero_title_en,
                ru: formData.hero_title_ru,
                pl: formData.hero_title_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: Миссия Raphael"
            />

            <MultilingualInput
              label="Параграф 1"
              fieldName="hero_paragraph1"
              values={{
                en: formData.hero_paragraph1_en,
                ru: formData.hero_paragraph1_ru,
                pl: formData.hero_paragraph1_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
              placeholder="Введите текст параграфа"
            />

            <MultilingualInput
              label="Параграф 2 (курсив)"
              fieldName="hero_paragraph2"
              values={{
                en: formData.hero_paragraph2_en,
                ru: formData.hero_paragraph2_ru,
                pl: formData.hero_paragraph2_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
              placeholder="Цитата, отображается курсивом"
            />

            <MultilingualInput
              label="Параграф 3"
              fieldName="hero_paragraph3"
              values={{
                en: formData.hero_paragraph3_en,
                ru: formData.hero_paragraph3_ru,
                pl: formData.hero_paragraph3_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
            />

            <MultilingualInput
              label="Параграф 4"
              fieldName="hero_paragraph4"
              values={{
                en: formData.hero_paragraph4_en,
                ru: formData.hero_paragraph4_ru,
                pl: formData.hero_paragraph4_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
            />

            <MultilingualInput
              label="Параграф 5"
              fieldName="hero_paragraph5"
              values={{
                en: formData.hero_paragraph5_en,
                ru: formData.hero_paragraph5_ru,
                pl: formData.hero_paragraph5_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
            />

            <div className="pt-2">
              <ImageUpload
                currentImage={formData.hero_image_url}
                onImageUpload={handleImageUpload}
                folder="about"
                label="Изображение Hero-блока"
              />
            </div>
          </div>
        </section>

        {/* ====================== CORE VALUES SECTION ====================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Ценности</h2>
          </div>

          <div className="space-y-6">
            <MultilingualInput
              label="Заголовок секции"
              fieldName="values_title"
              values={{
                en: formData.values_title_en,
                ru: formData.values_title_ru,
                pl: formData.values_title_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Наши ключевые ценности"
            />

            <MultilingualInput
              label="Описание секции"
              fieldName="values_desc"
              values={{
                en: formData.values_desc_en,
                ru: formData.values_desc_ru,
                pl: formData.values_desc_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={3}
              placeholder="Краткое описание под заголовком секции"
            />
          </div>

          {/* Cards */}
          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#2F7D6D] text-white text-sm font-bold font-poppins">
                    {idx}
                  </span>
                  <h3 className="text-base font-semibold text-gray-800 font-poppins">
                    Карточка {idx}
                  </h3>
                </div>

                <div className="space-y-5">
                  <MultilingualInput
                    label="Заголовок карточки"
                    fieldName={`value${idx}_title`}
                    values={{
                      en: formData[`value${idx}_title_en`],
                      ru: formData[`value${idx}_title_ru`],
                      pl: formData[`value${idx}_title_pl`],
                    }}
                    onChange={handleChange}
                    type="input"
                  />
                  <MultilingualInput
                    label="Описание карточки"
                    fieldName={`value${idx}_desc`}
                    values={{
                      en: formData[`value${idx}_desc_en`],
                      ru: formData[`value${idx}_desc_ru`],
                      pl: formData[`value${idx}_desc_pl`],
                    }}
                    onChange={handleChange}
                    type="textarea"
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================== ACTIONS ====================== */}
        <div className="sticky bottom-4 z-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <p className="flex-1 text-sm text-gray-600 font-poppins">
              Изменения сразу появятся на публичной странице после сохранения.
            </p>
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

export default AboutEditor;
