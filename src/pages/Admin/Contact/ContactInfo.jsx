import React, { useState, useEffect } from 'react';
import { contactService } from '../../../services/contactService';

const ContactInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    phone_number_en: '',
    phone_number_ru: '',
    phone_number_pl: '',
    email_en: '',
    email_ru: '',
    email_pl: '',
    address_line1_en: '',
    address_line1_ru: '',
    address_line1_pl: '',
    address_line2_en: '',
    address_line2_ru: '',
    address_line2_pl: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const data = await contactService.get();
      if (data) {
        setFormData(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch contact info');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await contactService.update(formData);
      setSuccess('Contact information updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update contact info');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.email) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
          Контактная информация
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
          Обновите контактные данные веб-сайта
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-700 font-poppins">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-poppins mb-4 sm:mb-6">
            Контактные данные
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-poppins">
                Номер телефона
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Английский
                  </label>
                  <input
                    type="text"
                    name="phone_number_en"
                    value={formData.phone_number_en}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Русский
                  </label>
                  <input
                    type="text"
                    name="phone_number_ru"
                    value={formData.phone_number_ru}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Польский
                  </label>
                  <input
                    type="text"
                    name="phone_number_pl"
                    value={formData.phone_number_pl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-poppins">
                Электронная почта
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Английский
                  </label>
                  <input
                    type="email"
                    name="email_en"
                    value={formData.email_en}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Русский
                  </label>
                  <input
                    type="email"
                    name="email_ru"
                    value={formData.email_ru}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Польский
                  </label>
                  <input
                    type="email"
                    name="email_pl"
                    value={formData.email_pl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-poppins mb-4 sm:mb-6">
            Адрес
          </h2>
          <div className="space-y-6">
            <div>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                    placeholder="ul. Główna 123"
                  />
                </div>
              </div>
            </div>
            <div>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Город
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-[#2F7D6D] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#266b5a] disabled:opacity-50 font-poppins shadow-sm"
        >
          {loading ? 'Сохранение...' : 'Обновить контактную информацию'}
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
