import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectsService } from '../../../services/projectsService';
import ImageUpload from '../../../components/ImageUpload';

const ProjectForm = () => {
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
    hero_description_en: '',
    hero_description_ru: '',
    hero_description_pl: '',
    what_we_do_en: '',
    what_we_do_ru: '',
    what_we_do_pl: '',
    impact_title_en: '',
    impact_title_ru: '',
    impact_title_pl: '',
    stat1_en: '',
    stat1_ru: '',
    stat1_pl: '',
    stat2_en: '',
    stat2_ru: '',
    stat2_pl: '',
    stat3_en: '',
    stat3_ru: '',
    stat3_pl: '',
    approach_title_en: '',
    approach_title_ru: '',
    approach_title_pl: '',
    approach1_en: '',
    approach1_ru: '',
    approach1_pl: '',
    approach2_en: '',
    approach2_ru: '',
    approach2_pl: '',
    approach3_en: '',
    approach3_ru: '',
    approach3_pl: '',
    approach4_en: '',
    approach4_ru: '',
    approach4_pl: '',
    image_url: '',
    slug: '',
    is_active: true,
  });

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getById(id);
      setFormData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch project');
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
        await projectsService.update(id, formData);
      } else {
        await projectsService.create(formData);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Failed to save project');
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

  const renderInput = (label, name, placeholder = '', rows = null) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">{label}</label>
      {rows ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">
          {isEdit ? 'Редактировать проект' : 'Создать новый проект'}
        </h1>
        <p className="mt-2 text-gray-600 font-poppins">
          Заполните информацию о проекте на всех языках
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Основная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInput('Название (Английский)', 'title_en', 'Street Evangelism')}
            {renderInput('Название (Русский)', 'title_ru', 'Уличная Евангелизация')}
            {renderInput('Название (Польский)', 'title_pl', 'Ewangelizacja Uliczna')}
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('Slug', 'slug', 'street-evangelism')}
          </div>
          <div className="mt-6">
            <ImageUpload
              currentImage={formData.image_url}
              onImageUpload={handleImageUpload}
              folder="projects"
              label="Изображение проекта"
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
              <span className="ml-2 text-sm font-medium text-gray-700 font-poppins">Активен</span>
            </label>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Описания</h2>
          <div className="space-y-6">
            {renderInput('Описание (Английский)', 'description_en', '', 3)}
            {renderInput('Описание (Русский)', 'description_ru', '', 3)}
            {renderInput('Описание (Польский)', 'description_pl', '', 3)}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Главная секция</h2>
          <div className="space-y-6">
            {renderInput('Описание главной секции (Английский)', 'hero_description_en', '', 2)}
            {renderInput('Описание главной секции (Русский)', 'hero_description_ru', '', 2)}
            {renderInput('Описание главной секции (Польский)', 'hero_description_pl', '', 2)}
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Чем мы занимаемся</h2>
          <div className="space-y-6">
            {renderInput('Чем мы занимаемся (Английский)', 'what_we_do_en', '', 4)}
            {renderInput('Чем мы занимаемся (Русский)', 'what_we_do_ru', '', 4)}
            {renderInput('Чем мы занимаемся (Польский)', 'what_we_do_pl', '', 4)}
          </div>
        </div>

        {/* Impact & Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">
            Влияние и результаты
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Заголовок влияния (АНГ)', 'impact_title_en')}
              {renderInput('Заголовок влияния (РУС)', 'impact_title_ru')}
              {renderInput('Заголовок влияния (ПОЛ)', 'impact_title_pl')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Статистика 1 (АНГ)', 'stat1_en', '500+ people reached')}
              {renderInput('Статистика 1 (РУС)', 'stat1_ru')}
              {renderInput('Статистика 1 (ПОЛ)', 'stat1_pl')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Статистика 2 (АНГ)', 'stat2_en')}
              {renderInput('Статистика 2 (РУС)', 'stat2_ru')}
              {renderInput('Статистика 2 (ПОЛ)', 'stat2_pl')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Статистика 3 (АНГ)', 'stat3_en')}
              {renderInput('Статистика 3 (РУС)', 'stat3_ru')}
              {renderInput('Статистика 3 (ПОЛ)', 'stat3_pl')}
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Наш подход</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Заголовок подхода (АНГ)', 'approach_title_en')}
              {renderInput('Заголовок подхода (РУС)', 'approach_title_ru')}
              {renderInput('Заголовок подхода (ПОЛ)', 'approach_title_pl')}
            </div>
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 font-poppins">
                  Пункт подхода {num}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {renderInput(`Подход ${num} (АНГ)`, `approach${num}_en`, '', 2)}
                  {renderInput(`Подход ${num} (РУС)`, `approach${num}_ru`, '', 2)}
                  {renderInput(`Подход ${num} (ПОЛ)`, `approach${num}_pl`, '', 2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#2F7D6D] text-white font-semibold rounded-lg hover:bg-[#266b5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F7D6D] disabled:opacity-50 font-poppins"
          >
            {loading ? 'Сохранение...' : isEdit ? 'Обновить проект' : 'Создать проект'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 font-poppins"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
