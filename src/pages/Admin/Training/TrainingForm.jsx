import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trainingService } from '../../../services/trainingService';
import ImageUpload from '../../../components/ImageUpload';

const TrainingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title_en: '',
    title_ru: '',
    title_pl: '',
    description_en: '',
    description_ru: '',
    description_pl: '',
    duration_en: '',
    duration_ru: '',
    duration_pl: '',
    image_url: '',
    is_active: true,
  });

  useEffect(() => {
    if (isEdit) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const data = await trainingService.getById(id);
      setFormData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch training program');
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
        await trainingService.update(id, formData);
      } else {
        await trainingService.create(formData);
      }
      navigate('/admin/training');
    } catch (err) {
      setError(err.message || 'Failed to save training program');
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
          {isEdit ? 'Edit Training Program' : 'Create New Training Program'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Title (English)
              </label>
              <input
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Title (Russian)
              </label>
              <input
                type="text"
                name="title_ru"
                value={formData.title_ru}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Title (Polish)
              </label>
              <input
                type="text"
                name="title_pl"
                value={formData.title_pl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
          </div>
          <div className="mt-6">
            <ImageUpload
              currentImage={formData.image_url}
              onImageUpload={handleImageUpload}
              folder="training"
              label="Training Program Image"
            />
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
              <span className="ml-2 text-sm font-medium text-gray-700 font-poppins">Active</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Duration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Duration (English)
              </label>
              <input
                type="text"
                name="duration_en"
                value={formData.duration_en}
                onChange={handleChange}
                placeholder="3 months"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Duration (Russian)
              </label>
              <input
                type="text"
                name="duration_ru"
                value={formData.duration_ru}
                onChange={handleChange}
                placeholder="3 месяца"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Duration (Polish)
              </label>
              <input
                type="text"
                name="duration_pl"
                value={formData.duration_pl}
                onChange={handleChange}
                placeholder="3 miesiące"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Description</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Description (English)
              </label>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Description (Russian)
              </label>
              <textarea
                name="description_ru"
                value={formData.description_ru}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Description (Polish)
              </label>
              <textarea
                name="description_pl"
                value={formData.description_pl}
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
            {loading ? 'Saving...' : isEdit ? 'Update Program' : 'Create Program'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/training')}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 font-poppins"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainingForm;
