import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

const NotFound = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { lang } = useParams();

  // Use language from URL params or context
  const currentLang = lang || language;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button variant="primary" onClick={() => navigate(`/${currentLang}`)} className="w-full">
            Go Home
          </Button>

          <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
