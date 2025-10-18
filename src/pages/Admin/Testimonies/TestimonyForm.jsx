import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { testimoniesService } from '../../../services/testimoniesService';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import ImageUpload from '../../../components/ImageUpload';

const TestimonyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    name_ru: '',
    name_pl: '',
    title_en: '',
    title_ru: '',
    title_pl: '',
    content_en: '',
    content_ru: '',
    content_pl: '',
    image_url: '',
    is_approved: true,
  });

  useEffect(() => {
    if (isEdit) {
      fetchTestimony();
    }
  }, [id]);

  const fetchTestimony = async () => {
    try {
      setLoading(true);
      const data = await testimoniesService.getById(id);
      // Убеждаемся, что поле name заполнено
      const formData = {
        ...data,
        name: data.name || data.name_en || '',
      };
      setFormData(formData);
    } catch (err) {
      setError(err.message || 'Failed to fetch testimony');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: newValue,
      };

      // Если изменяется name_en, обновляем также name
      if (name === 'name_en') {
        newFormData.name = newValue;
      }

      return newFormData;
    });
  };

  const handleImageUpload = (url) => {
    setFormData({
      ...formData,
      image_url: url,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit) {
        await testimoniesService.update(id, formData);
        success('Свидетельство успешно обновлено!', 'Успех');
      } else {
        await testimoniesService.create(formData);
        success('Свидетельство успешно создано!', 'Успех');
      }
      navigate('/admin/testimonies');
    } catch (err) {
      const errorMessage = err.message || 'Failed to save testimony';
      showError(errorMessage, t('alertSaveError'));
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">
          {isEdit ? 'Редактировать свидетельство' : 'Создать новое свидетельство'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Основная информация</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Имя (Английский) *
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
                  placeholder="e.g., John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Имя (Русский) *
                </label>
                <input
                  type="text"
                  name="name_ru"
                  value={formData.name_ru}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
                  placeholder="e.g., Джон Смит"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Имя (Польский) *
                </label>
                <input
                  type="text"
                  name="name_pl"
                  value={formData.name_pl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
                  placeholder="e.g., Jan Kowalski"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <ImageUpload
              currentImage={formData.image_url}
              onImageUpload={handleImageUpload}
              folder="testimonies"
              label="Изображение свидительства"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Местоположение (АНГ)
              </label>
              <input
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Местоположение (РУС)
              </label>
              <input
                type="text"
                name="title_ru"
                value={formData.title_ru}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Местоположение (ПОЛ)
              </label>
              <input
                type="text"
                name="title_pl"
                value={formData.title_pl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_approved"
                checked={formData.is_approved}
                onChange={handleChange}
                className="w-4 h-4 text-[#2F7D6D] border-gray-300 rounded focus:ring-[#2F7D6D]"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 font-poppins">Активно</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">
            Содержание свидительства
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Свидительство (Английский)
              </label>
              <textarea
                name="content_en"
                value={formData.content_en}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Свидительство (Русский)
              </label>
              <textarea
                name="content_ru"
                value={formData.content_ru}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Свидительство (Польский)
              </label>
              <textarea
                name="content_pl"
                value={formData.content_pl}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#2F7D6D] text-white font-semibold rounded-lg hover:bg-[#266b5a] disabled:opacity-50 font-poppins"
          >
            {loading
              ? 'Сохранение...'
              : isEdit
                ? 'Обновить свидетельство'
                : 'Создать свидетельство'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/testimonies')}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 font-poppins"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonyForm;
