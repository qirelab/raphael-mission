import React from 'react';
import PropTypes from 'prop-types';

const EditText = ({
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'border border-[#d1d5db] rounded-[8px] bg-[#ffffff] text-[#1f2937] font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F7D6D] focus:border-[#2F7D6D]';

  const inputClasses = `
    ${baseClasses}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    pt-[14px] pr-[14px] pb-[14px] pl-[14px]
    text-[16px] leading-[24px]
    ${className}
  `
    ?.trim()
    ?.replace(/\s+/g, ' ');

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
};

EditText.propTypes = {
  placeholder: PropTypes?.string,
  value: PropTypes?.string,
  onChange: PropTypes?.func,
  type: PropTypes?.string,
  disabled: PropTypes?.bool,
  fullWidth: PropTypes?.bool,
  className: PropTypes?.string,
};

export default EditText;
