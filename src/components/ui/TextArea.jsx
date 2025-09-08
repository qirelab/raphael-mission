import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ 
  placeholder = '', 
  value = '', 
  onChange, 
  rows = 4,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'border border-[#d1d5db] rounded-[8px] bg-[#ffffff] text-[#adaebc] font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical';
  
  const textareaClasses = `
    ${baseClasses}
    ${fullWidth ? 'w-full' : 'flex-1'}
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    pt-[12px] pr-[16px] pb-[12px] pl-[16px]
    text-[16px] leading-[24px]
    ${className}
  `?.trim()?.replace(/\s+/g, ' ');
  
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      className={textareaClasses}
      {...props}
    />
  );
};

TextArea.propTypes = {
  placeholder: PropTypes?.string,
  value: PropTypes?.string,
  onChange: PropTypes?.func,
  rows: PropTypes?.number,
  disabled: PropTypes?.bool,
  fullWidth: PropTypes?.bool,
  className: PropTypes?.string,
};

export default TextArea;