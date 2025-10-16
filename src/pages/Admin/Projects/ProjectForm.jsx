import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectsService } from '../../../services/projectsService';
import ImageUpload from '../../../components/ImageUpload';
import GalleryUploadSlot from '../../../components/GalleryUploadSlot';

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
    about_project_en: '',
    about_project_ru: '',
    about_project_pl: '',
    what_we_do_en: '',
    what_we_do_ru: '',
    what_we_do_pl: '',
    impact_title_en: '',
    impact_title_ru: '',
    impact_title_pl: '',
    impact_description_en: '',
    impact_description_ru: '',
    impact_description_pl: '',
    stat1_en: '',
    stat1_ru: '',
    stat1_pl: '',
    stat2_en: '',
    stat2_ru: '',
    stat2_pl: '',
    stat3_en: '',
    stat3_ru: '',
    stat3_pl: '',
    gallery_images: [],
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

        {/* About This Project */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Об этом проекте</h2>
          <div className="space-y-6">
            {renderInput(
              'Об этом проекте (Английский)',
              'about_project_en',
              'Detailed description of the project...',
              4
            )}
            {renderInput(
              'Об этом проекте (Русский)',
              'about_project_ru',
              'Подробное описание проекта...',
              4
            )}
            {renderInput(
              'Об этом проекте (Польский)',
              'about_project_pl',
              'Szczegółowy opis projektu...',
              4
            )}
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

        {/* Project Impact */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Влияние проекта</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Заголовок влияния (АНГ)', 'impact_title_en', 'Project Impact')}
              {renderInput('Заголовок влияния (РУС)', 'impact_title_ru', 'Влияние проекта')}
              {renderInput('Заголовок влияния (ПОЛ)', 'impact_title_pl', 'Wpływ projektu')}
            </div>
            <div className="space-y-6">
              {renderInput(
                'Описание влияния (АНГ)',
                'impact_description_en',
                'Describe the impact and results...',
                4
              )}
              {renderInput(
                'Описание влияния (РУС)',
                'impact_description_ru',
                'Опишите влияние и результаты...',
                4
              )}
              {renderInput(
                'Описание влияния (ПОЛ)',
                'impact_description_pl',
                'Opisz wpływ i rezultaty...',
                4
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Статистика 1 (АНГ)', 'stat1_en', '500+ people reached')}
              {renderInput('Статистика 1 (РУС)', 'stat1_ru', '500+ человек охвачено')}
              {renderInput('Статистика 1 (ПОЛ)', 'stat1_pl', '500+ osób objętych')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Статистика 2 (АНГ)', 'stat2_en', '15 communities served')}
              {renderInput('Статистика 2 (РУС)', 'stat2_ru', '15 сообществ обслужено')}
              {renderInput('Статистика 2 (ПОЛ)', 'stat2_pl', '15 społeczności obsłużonych')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('Статистика 3 (АНГ)', 'stat3_en', '10 regions covered')}
              {renderInput('Статистика 3 (РУС)', 'stat3_ru', '10 регионов охвачено')}
              {renderInput('Статистика 3 (ПОЛ)', 'stat3_pl', '10 regionów objętych')}
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Галерея проекта</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Фотографии галереи (максимум 6)
              </label>
              <p className="text-sm text-gray-500 mb-4 font-poppins">
                Загрузите до 6 изображений для галереи проекта. Каждый слот предназначен для одного
                изображения.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, index) => {
                  const image = formData.gallery_images && formData.gallery_images[index];
                  return (
                    <div key={index} className="relative group">
                      {image ? (
                        <div className="relative">
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...(formData.gallery_images || [])];
                              newImages.splice(index, 1);
                              setFormData({ ...formData, gallery_images: newImages });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <GalleryUploadSlot
                          index={index}
                          onImageUpload={(url) => {
                            const newImages = [...(formData.gallery_images || [])];
                            newImages[index] = url;
                            setFormData({
                              ...formData,
                              gallery_images: newImages,
                            });
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
