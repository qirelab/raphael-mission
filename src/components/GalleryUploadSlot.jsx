import React, { useState, useRef } from 'react';
import { storageService } from '../services/storageService';

const GalleryUploadSlot = ({ index, onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите файл изображения');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Размер изображения должен быть менее 5МБ');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Upload to Supabase
      const { url } = await storageService.uploadImage(file, 'projects/gallery');

      // Notify parent component
      onImageUpload(url);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить изображение');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-[#2F7D6D] hover:bg-gray-50 transition-all cursor-pointer group"
    >
      {uploading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F7D6D]"></div>
          <span className="text-sm text-gray-500 font-poppins">Загрузка...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-8 h-8 text-gray-400 group-hover:text-[#2F7D6D] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-500 font-poppins group-hover:text-[#2F7D6D] transition-colors">
            Фото {index + 1}
          </span>
          <span className="text-xs text-gray-400 font-poppins">Нажмите для загрузки</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <div className="absolute bottom-1 left-1 right-1">
          <p className="text-xs text-red-600 font-poppins text-center bg-white/90 rounded px-1">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryUploadSlot;
