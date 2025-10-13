import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { testimoniesService } from '../../../services/testimoniesService';
import ImageUpload from '../../../components/ImageUpload';

const TestimonyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    title_en: '',
    title_ru: '',
    title_pl: '',
    testimony_en: '',
    testimony_ru: '',
    testimony_pl: '',
    image_url: '',
    is_active: true,
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
      setFormData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch testimony');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
      } else {
        await testimoniesService.create(formData);
      }
      navigate('/admin/testimonies');
    } catch (err) {
      setError(err.message || 'Failed to save testimony');
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

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Основная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Имя *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
                placeholder="e.g., John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Местоположение
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
                placeholder="e.g., New York, USA"
              />
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
                Заголовок (АНГ)
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
                Заголовок (РУС)
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
                Заголовок (ПОЛ)
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
                name="is_active"
                checked={formData.is_active}
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
                name="testimony_en"
                value={formData.testimony_en}
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
                name="testimony_ru"
                value={formData.testimony_ru}
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
                name="testimony_pl"
                value={formData.testimony_pl}
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
