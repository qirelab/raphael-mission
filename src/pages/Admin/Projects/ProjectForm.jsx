import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectsService } from '../../../services/projectsService';
import { useProjects } from '../../../context/ProjectsContext';
import { useAlert } from '../../../hooks/useAlert';
import { useLanguage } from '../../../context/LanguageContext';
import ImageUpload from '../../../components/ImageUpload';
import GalleryUploadSlot from '../../../components/GalleryUploadSlot';
import MultilingualInput from '../../../components/MultilingualInput';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { refreshProjects } = useProjects();
  const { success, error: showError } = useAlert();
  const { t } = useLanguage();
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
      setError(err.message || 'Не удалось загрузить проект');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title_en
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  // Auto-generate slug when title_en changes (only for new projects)
  useEffect(() => {
    if (!isEdit && formData.title_en) {
      const newSlug = generateSlug(formData.title_en);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title_en, isEdit]);

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
      // Базовая валидация
      if (!formData.title_en?.trim()) {
        throw new Error('Название на английском языке обязательно');
      }
      if (!formData.slug?.trim()) {
        throw new Error('Slug обязателен');
      }

      if (isEdit) {
        await projectsService.update(id, formData);
        success('Проект успешно обновлен!', 'Успех');
      } else {
        await projectsService.create(formData);
        success('Проект успешно создан!', 'Успех');
      }
      // Refresh projects context for public frontend
      await refreshProjects();
      navigate('/admin/projects');
    } catch (err) {
      const errorMessage = err.message || 'Не удалось сохранить проект';
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
          <div className="space-y-6">
            <MultilingualInput
              label="Название проекта"
              fieldName="title"
              values={{
                en: formData.title_en,
                ru: formData.title_ru,
                pl: formData.title_pl,
              }}
              onChange={handleChange}
              type="input"
              required
              placeholder="Введите название проекта"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Slug (генерируется автоматически)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                readOnly
                disabled
                placeholder="автоматически из названия"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-poppins"
              />
            </div>
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
          <MultilingualInput
            label="Краткое описание"
            fieldName="description"
            values={{
              en: formData.description_en,
              ru: formData.description_ru,
              pl: formData.description_pl,
            }}
            onChange={handleChange}
            type="textarea"
            rows={3}
            placeholder="Введите краткое описание проекта"
          />
        </div>

        {/* About This Project */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Об этом проекте</h2>
          <MultilingualInput
            label="Подробное описание проекта"
            fieldName="about_project"
            values={{
              en: formData.about_project_en,
              ru: formData.about_project_ru,
              pl: formData.about_project_pl,
            }}
            onChange={handleChange}
            type="textarea"
            rows={4}
            placeholder="Введите подробное описание проекта"
          />
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Чем мы занимаемся</h2>
          <MultilingualInput
            label="Чем мы занимаемся"
            fieldName="what_we_do"
            values={{
              en: formData.what_we_do_en,
              ru: formData.what_we_do_ru,
              pl: formData.what_we_do_pl,
            }}
            onChange={handleChange}
            type="textarea"
            rows={4}
            placeholder="Опишите деятельность в рамках проекта"
          />
        </div>

        {/* Project Impact */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Влияние проекта</h2>
          <div className="space-y-6">
            <MultilingualInput
              label="Описание влияния"
              fieldName="impact_description"
              values={{
                en: formData.impact_description_en,
                ru: formData.impact_description_ru,
                pl: formData.impact_description_pl,
              }}
              onChange={handleChange}
              type="textarea"
              rows={4}
              placeholder="Опишите влияние и результаты проекта"
            />

            <MultilingualInput
              label="Статистика 1"
              fieldName="stat1"
              values={{
                en: formData.stat1_en,
                ru: formData.stat1_ru,
                pl: formData.stat1_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: 500+ people reached"
            />

            <MultilingualInput
              label="Статистика 2"
              fieldName="stat2"
              values={{
                en: formData.stat2_en,
                ru: formData.stat2_ru,
                pl: formData.stat2_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: 15 communities served"
            />

            <MultilingualInput
              label="Статистика 3"
              fieldName="stat3"
              values={{
                en: formData.stat3_en,
                ru: formData.stat3_ru,
                pl: formData.stat3_pl,
              }}
              onChange={handleChange}
              type="input"
              placeholder="Например: 10 regions covered"
            />
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
