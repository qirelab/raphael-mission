import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAlert } from '../../hooks/useAlert';
import FlagUS from '../icons/FlagUS';
import FlagRU from '../icons/FlagRU';
import FlagPL from '../icons/FlagPL';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const { success } = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', FlagComponent: FlagUS },
    { code: 'ru', name: 'Русский', FlagComponent: FlagRU },
    { code: 'pl', name: 'Polski', FlagComponent: FlagPL },
  ];

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode) => {
    const selectedLanguage = languages.find((lang) => lang.code === languageCode);
    changeLanguage(languageCode);

    // Показываем Alert с переводом на выбранном языке
    const translations = {
      en: { changed: 'Language changed to', title: 'Language changed' },
      ru: { changed: 'Язык изменен на', title: 'Язык изменен' },
      pl: { changed: 'Język zmieniony na', title: 'Język zmieniony' },
    };

    const translation = translations[languageCode] || translations.en;
    success(`${translation.changed} ${selectedLanguage?.name}`, translation.title);

    setIsOpen(false);
  };

  const CurrentFlag = currentLang?.FlagComponent;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3c8a7a] transition-all duration-200"
        aria-label={t('language')}
      >
        {CurrentFlag && <CurrentFlag className="w-6 h-4" />}
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((language) => {
              const Flag = language.FlagComponent;
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-150 ${
                    currentLanguage === language.code
                      ? 'bg-[#3c8a7a] text-white hover:bg-[#2d6b5d]'
                      : 'text-gray-700'
                  }`}
                >
                  {Flag && <Flag className="w-6 h-4" />}
                  <span>{language.name}</span>
                  {currentLanguage === language.code && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
