import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testimoniesService } from '../../../services/testimoniesService';

const TestimoniesList = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      setLoading(true);
      const data = await testimoniesService.getAll();
      setTestimonies(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch testimonies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить это свидетельство?')) {
      return;
    }

    try {
      await testimoniesService.delete(id);
      setTestimonies(testimonies.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message || 'Не удалось удалить свидетельство');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
            Свидетельства
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            Управление свидительствами
          </p>
        </div>
        <Link
          to="/admin/testimonies/new"
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-[#2F7D6D] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#266b5a] transition-colors duration-200 font-poppins shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Добавить новое свидетельство
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
          <p className="text-sm sm:text-base text-red-700 font-poppins">{error}</p>
        </div>
      )}

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-4">
        {testimonies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 font-poppins">
              Свидетельства не найдены. Создайте своё первое свидетельство!
            </p>
          </div>
        ) : (
          testimonies.map((testimony) => (
            <div
              key={testimony.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                {testimony.image_url && (
                  <img
                    src={testimony.image_url}
                    alt={testimony.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 font-poppins">
                    {testimony.name}
                  </h3>
                  {testimony.title_en && (
                    <p className="text-sm text-gray-500 font-poppins mt-0.5">
                      {testimony.title_en}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-700 font-poppins line-clamp-3">
                {testimony.testimony_en}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full font-poppins ${
                      testimony.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {testimony.is_active ? 'Активен' : 'Неактивен'}
                  </span>
                  <span className="text-xs text-gray-500 font-poppins">
                    {new Date(testimony.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link
                  to={`/admin/testimonies/edit/${testimony.id}`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors font-poppins"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(testimony.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors font-poppins"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase font-poppins">
                  Человек
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase font-poppins">
                  Свидетельство
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase font-poppins">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase font-poppins">
                  Создан
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase font-poppins">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testimonies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-poppins">
                    Свидетельства не найдены. Создайте своё первое свидетельство!
                  </td>
                </tr>
              ) : (
                testimonies.map((testimony) => (
                  <tr key={testimony.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {testimony.image_url && (
                          <img
                            src={testimony.image_url}
                            alt={testimony.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-poppins">
                            {testimony.name}
                          </div>
                          <div className="text-sm text-gray-500 font-poppins">
                            {testimony.title_en}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-poppins truncate max-w-xs">
                        {testimony.testimony_en?.substring(0, 80)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-poppins ${
                          testimony.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {testimony.is_active ? 'Активен' : 'Неактивен'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-poppins">
                      {new Date(testimony.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/testimonies/edit/${testimony.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4 font-poppins transition-colors"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(testimony.id)}
                        className="text-red-600 hover:text-red-900 font-poppins transition-colors"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestimoniesList;
