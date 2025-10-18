import React, { useState, useEffect } from 'react';
import { useContact } from '../../../context/ContactContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';

const ContactInfo = () => {
  const { contactData, loading, error: contextError, updateContactData } = useContact();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    address_line1_en: '',
    address_line1_ru: '',
    address_line1_pl: '',
    address_line2_en: '',
    address_line2_ru: '',
    address_line2_pl: '',
    city: '',
    country: '',
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Update form when contact data changes
  useEffect(() => {
    if (contactData) {
      setFormData({
        phone_number: contactData.phone_number || '',
        email: contactData.email || '',
        address_line1_en: contactData.address_line1_en || '',
        address_line1_ru: contactData.address_line1_ru || '',
        address_line1_pl: contactData.address_line1_pl || '',
        address_line2_en: contactData.address_line2_en || '',
        address_line2_ru: contactData.address_line2_ru || '',
        address_line2_pl: contactData.address_line2_pl || '',
        city: contactData.city || '',
        country: contactData.country || '',
      });
    }
  }, [contactData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await updateContactData(formData);
      success('Contact information updated successfully!', 'Success');
    } catch (error) {
      showError(error.message || 'Failed to update contact information', t('alertSaveError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Контактная информация</h1>
        <p className="mt-2 text-base text-gray-600 font-poppins">
          Обновите контактные данные веб-сайта
        </p>
      </div>

      {/* Context Error */}
      {contextError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{contextError}</p>
        </div>
      )}

      {/* Submit Error */}
      {submitError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{submitError}</p>
        </div>
      )}

      {/* Submit Success */}
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-700 font-poppins">{submitSuccess}</p>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Details Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Контактные данные</h2>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                placeholder="+1 234 567 8900"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                placeholder="contact@example.com"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Адрес</h2>

          {/* Address Line 1 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-poppins">
              Адрес (строка 1)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Английский
                </label>
                <input
                  type="text"
                  name="address_line1_en"
                  value={formData.address_line1_en}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Русский
                </label>
                <input
                  type="text"
                  name="address_line1_ru"
                  value={formData.address_line1_ru}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                  placeholder="ул. Главная 123"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Польский
                </label>
                <input
                  type="text"
                  name="address_line1_pl"
                  value={formData.address_line1_pl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                  placeholder="ul. Główna 123"
                />
              </div>
            </div>
          </div>

          {/* Address Line 2 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-poppins">
              Адрес (строка 2, необязательно)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Английский
                </label>
                <input
                  type="text"
                  name="address_line2_en"
                  value={formData.address_line2_en}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Русский
                </label>
                <input
                  type="text"
                  name="address_line2_ru"
                  value={formData.address_line2_ru}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Польский
                </label>
                <input
                  type="text"
                  name="address_line2_pl"
                  value={formData.address_line2_pl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                />
              </div>
            </div>
          </div>

          {/* City and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Город
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Страна
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-[#2F7D6D] text-white text-base font-semibold rounded-lg hover:bg-[#266b5a] disabled:opacity-50 disabled:cursor-not-allowed font-poppins shadow-sm transition-colors"
        >
          {isSubmitting ? 'Сохранение...' : 'Обновить контактную информацию'}
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
