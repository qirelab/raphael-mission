import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { testimoniesService } from '../../../services/testimoniesService';
import { ListSkeleton } from '../../../components/skeletons';
import ConfirmModal from '../../../components/ui/ConfirmModal';

const TestimoniesList = () => {
  const location = useLocation();
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonyToDelete, setTestimonyToDelete] = useState(null);
  const isFetching = React.useRef(false);

  // Refresh list when returning from form (location change)
  useEffect(() => {
    // Prevent duplicate fetches
    if (isFetching.current) return;
    isFetching.current = true;

    fetchTestimonies().finally(() => {
      isFetching.current = false;
    });
  }, [location.pathname]);

  const fetchTestimonies = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await testimoniesService.getAll();
      setTestimonies(data);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить свидетельства');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = (id) => {
    setTestimonyToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!testimonyToDelete) return;

    try {
      setDeletingId(testimonyToDelete);
      await testimoniesService.delete(testimonyToDelete);
      // Refresh data instead of just filtering to ensure consistency
      await fetchTestimonies(true);
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Не удалось удалить свидетельство');
    } finally {
      setDeletingId(null);
      setTestimonyToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTestimonyToDelete(null);
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="animate-pulse bg-gray-200 rounded h-8 w-48"></div>
          <div className="animate-pulse bg-gray-200 rounded h-10 w-32"></div>
        </div>
        <ListSkeleton count={5} />
      </div>
    );
  }

  // Show skeleton overlay when refreshing
  if (refreshing) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
              Свидетельства
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
              Управление свидетельствами верующих
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Link
              to="/admin/testimonies/hero"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-white border border-[#2F7D6D] text-[#2F7D6D] text-sm sm:text-base font-semibold rounded-lg hover:bg-[#2F7D6D]/5 transition-colors duration-200 font-poppins shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v5H4V5zm0 9h16v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z"
                />
              </svg>
              Редактировать страницу
            </Link>
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
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center gap-2 text-[#2F7D6D] font-poppins">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#2F7D6D] border-t-transparent"></div>
              Обновление данных...
            </div>
          </div>
          <ListSkeleton count={testimonies.length || 5} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
            Свидетельства
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            Управление свидетельствами верующих
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Link
            to="/admin/testimonies/hero"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-white border border-[#2F7D6D] text-[#2F7D6D] text-sm sm:text-base font-semibold rounded-lg hover:bg-[#2F7D6D]/5 transition-colors duration-200 font-poppins shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v5H4V5zm0 9h16v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z"
              />
            </svg>
            Редактировать страницу
          </Link>
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
              Свидетельства не найдены. Создайте первое свидетельство!
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
                    alt={testimony.name_en}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 font-poppins truncate">
                    {testimony.name_en}
                  </h3>
                  <p className="text-sm text-gray-500 font-poppins line-clamp-2 mt-1">
                    {testimony.testimony_en}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full font-poppins ${
                        testimony.is_approved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {testimony.is_approved ? 'Активно' : 'Неактивно'}
                    </span>
                    <span className="text-xs text-gray-500 font-poppins">
                      {new Date(testimony.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/testimonies/edit/${testimony.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#2F7D6D] bg-[#2F7D6D]/10 rounded-lg hover:bg-[#2F7D6D]/20 transition-colors duration-200 font-poppins"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Редактировать
                  </Link>
                  <button
                    onClick={() => handleDelete(testimony.id)}
                    disabled={deletingId === testimony.id}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === testimony.id ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 mr-1 border border-red-600 border-t-transparent"></div>
                        Удаление...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Удалить
                      </>
                    )}
                  </button>
                </div>
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
                  Свидетельство
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase font-poppins">
                  Текст
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
                            alt={testimony.name_en}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-poppins">
                            {testimony.name_en}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 font-poppins truncate max-w-xs">
                        {testimony.testimony_en?.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full font-poppins ${
                          testimony.is_approved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {testimony.is_approved ? 'Активно' : 'Неактивно'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-poppins">
                      {new Date(testimony.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium font-poppins">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/testimonies/edit/${testimony.id}`}
                          className="text-[#2F7D6D] hover:text-[#266b5a] transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(testimony.id)}
                          disabled={deletingId === testimony.id}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === testimony.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border border-red-600 border-t-transparent"></div>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Удалить свидетельство?"
        message="Вы уверены, что хотите удалить это свидетельство? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
        variant="danger"
        loading={deletingId === testimonyToDelete}
      />
    </div>
  );
};

export default TestimoniesList;
