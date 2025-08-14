import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  rightIcon = null,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options?.find(option => option?.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between
          px-[10px] py-[8px] pr-[42px]
          bg-global-4 border border-[#d1d5db] rounded-[8px]
          text-[16px] font-inter font-normal leading-[20px] text-left
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-global-5'}
          focus:outline-none focus:ring-2 focus:ring-global-1 focus:border-transparent
          transition-colors duration-200
        `}
        {...props}
      >
        <span className={selectedOption ? 'text-global-8' : 'text-global-5'}>
          {selectedOption ? selectedOption?.label : placeholder}
        </span>
        <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2">
          {rightIcon ? (
            <img 
              src={rightIcon?.src} 
              alt="dropdown arrow" 
              className={`w-[${rightIcon?.width}px] h-[${rightIcon?.height}px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          ) : (
            <svg 
              className={`w-5 h-5 text-global-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-global-4 border border-[#d1d5db] rounded-[8px] shadow-lg max-h-60 overflow-auto">
          {options?.length === 0 ? (
            <div className="px-3 py-2 text-global-5 text-sm">No options available</div>
          ) : (
            options?.map((option, index) => (
              <button
                key={option?.value || index}
                type="button"
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-3 py-2 text-left text-[16px] font-inter font-normal
                  hover:bg-global-3 focus:bg-global-3 focus:outline-none
                  transition-colors duration-150
                  ${selectedOption?.value === option?.value ? 'bg-global-3 text-global-1' : 'text-global-8'}
                  ${index === 0 ? 'rounded-t-[8px]' : ''}
                  ${index === options?.length - 1 ? 'rounded-b-[8px]' : ''}
                `}
              >
                {option?.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes?.arrayOf(
    PropTypes?.shape({
      value: PropTypes?.oneOfType([PropTypes?.string, PropTypes?.number])?.isRequired,
      label: PropTypes?.string?.isRequired,
    })
  ),
  value: PropTypes?.oneOfType([PropTypes?.string, PropTypes?.number]),
  onChange: PropTypes?.func,
  placeholder: PropTypes?.string,
  disabled: PropTypes?.bool,
  className: PropTypes?.string,
  rightIcon: PropTypes?.shape({
    src: PropTypes?.string?.isRequired,
    width: PropTypes?.number,
    height: PropTypes?.number,
  }),
};

export default Dropdown;