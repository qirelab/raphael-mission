import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get language from URL pathname (e.g., /en/about, /ru/about, /pl/about)
  const getLanguageFromPath = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];

    // Check if first segment is a valid language code
    if (firstSegment && translations[firstSegment]) {
      return firstSegment;
    }

    // Fallback to localStorage for backward compatibility
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }

    return 'en'; // Default language
  };

  const [currentLanguage, setCurrentLanguage] = useState(getLanguageFromPath);

  // Update language when URL changes
  useEffect(() => {
    const newLanguage = getLanguageFromPath();
    if (newLanguage !== currentLanguage) {
      setCurrentLanguage(newLanguage);
    }
  }, [location.pathname]);

  // Update html lang attribute for font switching
  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    if (translations[language]) {
      const currentPath = location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);

      // Check if first segment is a language code
      const isFirstSegmentLanguage = pathSegments[0] && translations[pathSegments[0]];

      let newPath;
      if (isFirstSegmentLanguage) {
        // Replace language in existing path
        pathSegments[0] = language;
        newPath = '/' + pathSegments.join('/');
      } else {
        // Add language to path
        newPath = `/${language}${currentPath}`;
      }

      // Preserve query parameters and hash
      const search = location.search;
      const hash = location.hash;
      const fullPath = newPath + search + hash;

      navigate(fullPath, { replace: true });
      setCurrentLanguage(language);

      // Also save to localStorage for backward compatibility
      localStorage.setItem('language', language);
    }
  };

  const t = (key) => {
    return translations[currentLanguage][key] || translations['en'][key] || key;
  };

  const value = {
    currentLanguage,
    language: currentLanguage,
    changeLanguage,
    t,
    translations: translations[currentLanguage],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
