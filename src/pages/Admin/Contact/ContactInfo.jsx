import React, { useState, useEffect } from 'react';
import { contactService } from '../../../services/contactService';

const ContactInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    address_line1: '',
    address_line2: '',
    city: '',
    country: '',
    facebook_url: '',
    twitter_url: '',
    youtube_url: '',
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const data = await contactService.get();
      if (data) {
        setFormData(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch contact info');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await contactService.update(formData);
      setSuccess('Contact information updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update contact info');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.email) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Contact Information</h1>
        <p className="mt-2 text-gray-600 font-poppins">Update website contact details</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-poppins">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-700 font-poppins">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Address</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Address Line 1
              </label>
              <input
                type="text"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Address Line 2
              </label>
              <input
                type="text"
                name="address_line2"
                value={formData.address_line2}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">Social Media</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Twitter URL
              </label>
              <input
                type="url"
                name="twitter_url"
                value={formData.twitter_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                YouTube URL
              </label>
              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] font-poppins"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#2F7D6D] text-white font-semibold rounded-lg hover:bg-[#266b5a] disabled:opacity-50 font-poppins"
        >
          {loading ? 'Saving...' : 'Update Contact Information'}
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
