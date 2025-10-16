import React, { useState } from 'react';
import { authService } from '../../services/authService';

const Settings = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
    currentPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Пароли не совпадают' });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Пароль должен содержать минимум 8 символов' });
      return;
    }

    setLoading(true);

    try {
      await authService.updatePassword(formData.newPassword);
      setMessage({ type: 'success', text: 'Пароль успешно изменен!' });
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Не удалось изменить пароль' });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.newEmail) {
      setMessage({ type: 'error', text: 'Введите новый email' });
      return;
    }

    if (!formData.currentPassword) {
      setMessage({ type: 'error', text: 'Введите текущий пароль для подтверждения' });
      return;
    }

    setLoading(true);

    try {
      await authService.updateEmail(formData.newEmail);
      setMessage({
        type: 'success',
        text: 'Email успешно изменен! Проверьте новую почту для подтверждения.',
      });
      setFormData((prev) => ({
        ...prev,
        newEmail: '',
        currentPassword: '',
      }));
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Не удалось изменить email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Настройки</h1>
        <p className="mt-2 text-gray-600 font-poppins">Управление настройками учетной записи</p>
      </div>

      {/* Change Email Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100 mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Изменить email</h2>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border-l-4 border-green-500'
                : 'bg-red-50 border-l-4 border-red-500'
            }`}
          >
            <div className="flex items-center">
              <p
                className={`font-poppins ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}
              >
                {message.text}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Новый email
            </label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              placeholder="new@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Текущий пароль (для подтверждения)
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              placeholder="Введите текущий пароль"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-[#2F7D6D] text-white font-semibold rounded-lg hover:bg-[#266b5a] transition-colors duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Изменение...' : 'Изменить email'}
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Изменить пароль</h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Новый пароль
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              placeholder="Минимум 8 символов"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Подтвердите пароль
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              placeholder="Повторите новый пароль"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-[#2F7D6D] text-white font-semibold rounded-lg hover:bg-[#266b5a] transition-colors duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Изменение...' : 'Изменить пароль'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
