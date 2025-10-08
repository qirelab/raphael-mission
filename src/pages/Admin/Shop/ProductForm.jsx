import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shopService } from '../../../services/shopService';
import ImageUpload from '../../../components/ImageUpload';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name_en: '',
    name_ru: '',
    name_pl: '',
    description_en: '',
    description_ru: '',
    description_pl: '',
    price: '',
    currency: 'USD',
    image_url: '',
    stock_quantity: 0,
    is_active: true,
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await shopService.getById(id);
      setFormData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch product');
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
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
      };

      if (isEdit) {
        await shopService.update(id, dataToSend);
      } else {
        await shopService.create(dataToSend);
      }
      navigate('/admin/shop');
    } catch (err) {
      setError(err.message || 'Failed to save product');
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
          {isEdit ? 'Edit Product' : 'Create New Product'}
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
                Name (English)
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Name (Russian)
              </label>
              <input
                type="text"
                name="name_ru"
                value={formData.name_ru}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Name (Polish)
              </label>
              <input
                type="text"
                name="name_pl"
                value={formData.name_pl}
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
              folder="products"
              label="Product Image"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="PLN">PLN</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                required
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
              <span className="ml-2 text-sm font-medium text-gray-700 font-poppins">Active</span>
            </label>
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
                rows={4}
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
                rows={4}
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
                rows={4}
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
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/shop')}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 font-poppins"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
