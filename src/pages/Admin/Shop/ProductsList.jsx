import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shopService } from '../../../services/shopService';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await shopService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      await shopService.delete(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || 'Не удалось удалить товар');
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
            Товары магазина
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            Управление товарами магазина
          </p>
        </div>
        <Link
          to="/admin/shop/new"
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
          Добавить новый товар
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
          <p className="text-sm sm:text-base text-red-700 font-poppins">{error}</p>
        </div>
      )}

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-4">
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 font-poppins">
              Товары не найдены. Создайте свой первый товар!
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name_en}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 font-poppins truncate">
                    {product.name_en}
                  </h3>
                  <p className="text-sm text-gray-500 font-poppins line-clamp-2 mt-1">
                    {product.description_en}
                  </p>
                  <p className="text-sm font-semibold text-[#2F7D6D] mt-2">
                    {product.price} {product.currency}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full font-poppins ${
                      product.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {product.is_active ? 'Активен' : 'Неактивен'}
                  </span>
                  <span className="text-xs text-gray-500 font-poppins">
                    {new Date(product.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link
                  to={`/admin/shop/edit/${product.id}`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors font-poppins"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
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
                  Товар
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase font-poppins">
                  Цена
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
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-poppins">
                    Товары не найдены. Создайте свой первый товар!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name_en}
                            className="w-10 h-10 rounded object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-poppins">
                            {product.name_en}
                          </div>
                          <div className="text-sm text-gray-500 font-poppins truncate max-w-xs">
                            {product.description_en?.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900 font-poppins">
                        {product.price} {product.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-poppins ${
                          product.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.is_active ? 'Активен' : 'Неактивен'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-poppins">
                      {new Date(product.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/shop/edit/${product.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4 font-poppins transition-colors"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
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

export default ProductsList;
