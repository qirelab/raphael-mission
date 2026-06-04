import React, { useState, useEffect } from 'react';
import { useContact } from '../../../context/ContactContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import MultilingualInput from '../../../components/MultilingualInput';

const MULTILINGUAL_FIELDS = ['address_line1', 'address_line2', 'city', 'country'];
const LANGS = ['en', 'ru', 'pl'];

const EMPTY_FORM = {
  phone_number: '',
  email: '',
  ...Object.fromEntries(
    MULTILINGUAL_FIELDS.flatMap((base) => LANGS.map((lang) => [`${base}_${lang}`, '']))
  ),
};

const ContactInfo = () => {
  const { contactData, loading, error: contextError, updateContactData } = useContact();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!contactData) return;
    const next = { ...EMPTY_FORM };
    for (const key of Object.keys(EMPTY_FORM)) {
      next[key] = contactData[key] ?? '';
    }
    // Backwards-compat: if the row still has only the legacy single-language
    // city/country (older DBs that haven't been re-saved through the new UI),
    // surface those values in the EN inputs so the admin sees them.
    if (!next.city_en && contactData.city) next.city_en = contactData.city;
    if (!next.country_en && contactData.country) next.country_en = contactData.country;
    setFormData(next);
  }, [contactData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateContactData(formData);
      success('Контактная информация успешно обновлена!', 'Сохранено');
    } catch (error) {
      showError(error.message || 'Не удалось обновить контактную информацию', t('alertSaveError'));
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

  const multilingualValues = (base) => ({
    en: formData[`${base}_en`],
    ru: formData[`${base}_ru`],
    pl: formData[`${base}_pl`],
  });

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Контактная информация</h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Обновите контактные данные веб-сайта
        </p>
      </div>

      {contextError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{contextError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Phone & Email — single-language fields */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Контактные данные</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Номер телефона
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins text-sm transition-all duration-200"
                placeholder="+48 570 941 670"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Электронная почта
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins text-sm transition-all duration-200"
                placeholder="im.raphael@gmail.com"
              />
            </div>
          </div>
        </div>

        {/* Address — multilingual fields */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-[#2F7D6D] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 font-poppins">Адрес</h2>
          </div>
          <p className="text-sm text-gray-500 font-poppins mb-6 ml-4">
            Заполните каждое поле на трёх языках — публичный сайт покажет вариант для текущего языка пользователя.
          </p>

          <div className="space-y-6">
            <MultilingualInput
              label="Адрес (строка 1)"
              fieldName="address_line1"
              values={multilingualValues('address_line1')}
              onChange={handleInputChange}
              type="input"
              placeholder="Brzeg 3/1 44-178"
            />
            <MultilingualInput
              label="Адрес (строка 2, необязательно)"
              fieldName="address_line2"
              values={multilingualValues('address_line2')}
              onChange={handleInputChange}
              type="input"
              placeholder="Дополнительная строка адреса"
            />
            <MultilingualInput
              label="Город"
              fieldName="city"
              values={multilingualValues('city')}
              onChange={handleInputChange}
              type="input"
              placeholder="Gliwice / Гливице"
            />
            <MultilingualInput
              label="Страна"
              fieldName="country"
              values={multilingualValues('country')}
              onChange={handleInputChange}
              type="input"
              placeholder="Poland / Польша / Polska"
            />
          </div>
        </div>

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

export default ContactInfo;
