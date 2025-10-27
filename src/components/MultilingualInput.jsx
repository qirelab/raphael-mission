import React, { useState } from 'react';
import FlagUS from './icons/FlagUS';
import FlagRU from './icons/FlagRU';
import FlagPL from './icons/FlagPL';

/**
 * MultilingualInput - универсальный компонент для мультиязычного ввода
 * Показывает dropdown для выбора языка и input/textarea для выбранного языка
 *
 * @param {string} label - метка поля (например, "Название")
 * @param {string} fieldName - базовое имя поля (например, "title")
 * @param {object} values - объект со значениями для всех языков { en: '', ru: '', pl: '' }
 * @param {function} onChange - функция обработки изменений (name, value)
 * @param {string} type - тип поля: 'input' или 'textarea'
 * @param {number} rows - количество строк для textarea (по умолчанию 4)
 * @param {boolean} required - обязательное ли поле
 * @param {string} placeholder - подсказка для поля
 */
const MultilingualInput = ({
  label,
  fieldName,
  values = { en: '', ru: '', pl: '' },
  onChange,
  type = 'input',
  rows = 4,
  required = false,
  placeholder = '',
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', FlagComponent: FlagUS, label: 'АНГ' },
    { code: 'ru', name: 'Русский', FlagComponent: FlagRU, label: 'РУС' },
    { code: 'pl', name: 'Polski', FlagComponent: FlagPL, label: 'ПОЛ' },
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
  };

  const handleInputChange = (e) => {
    const fieldNameWithLang = `${fieldName}_${selectedLanguage}`;
    onChange({ target: { name: fieldNameWithLang, value: e.target.value } });
  };

  // Проверяем, заполнено ли поле для конкретного языка
  const isLanguageFilled = (langCode) => {
    return values[langCode] && values[langCode].trim() !== '';
  };

  // Получаем текущее значение для выбранного языка
  const currentValue = values[selectedLanguage] || '';

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label className="block text-sm font-semibold text-gray-700 font-poppins">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Language Selector Dropdown */}
        <div className="flex gap-2">
          {languages.map((lang) => {
            const Flag = lang.FlagComponent;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg font-poppins text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${
                    selectedLanguage === lang.code
                      ? 'bg-[#2F7D6D] text-white shadow-md ring-2 ring-[#2F7D6D] ring-offset-1'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-[#2F7D6D]'
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#2F7D6D] focus:ring-offset-1
                `}
                aria-label={`Выбрать ${lang.name}`}
              >
                {Flag && <Flag className="w-6 h-4" />}
                <span className="hidden sm:inline">{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Field */}
      <div>
        {type === 'textarea' ? (
          <textarea
            name={`${fieldName}_${selectedLanguage}`}
            value={currentValue}
            onChange={handleInputChange}
            rows={rows}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins text-sm resize-y transition-all duration-200"
          />
        ) : (
          <input
            type="text"
            name={`${fieldName}_${selectedLanguage}`}
            value={currentValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent font-poppins text-sm transition-all duration-200"
          />
        )}
      </div>

      {/* Status indicators for all languages */}
      <div className="flex items-center gap-2 text-xs text-gray-500 font-poppins">
        <span>Заполнено:</span>
        {languages.map((lang) => {
          const Flag = lang.FlagComponent;
          return (
            <span
              key={lang.code}
              className={`flex items-center gap-1 px-2 py-1 rounded ${
                isLanguageFilled(lang.code)
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              {Flag && <Flag className="w-4 h-3" />}
              <span className="hidden sm:inline">{lang.label}</span>
              {isLanguageFilled(lang.code) && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MultilingualInput;
