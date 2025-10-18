import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Alert = ({ type = 'info', title, message, duration = 5000, onClose, show = true, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsLeaving(false);

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const getAlertStyles = () => {
    const baseStyles =
      'fixed bottom-4 left-4 z-[10000] max-w-sm w-full mx-4 sm:max-w-md transform transition-all duration-300 ease-out';

    const typeStyles = {
      success: 'bg-white border-green-200 text-green-800 shadow-lg',
      error: 'bg-white border-red-200 text-red-800 shadow-lg',
      warning: 'bg-white border-yellow-200 text-yellow-800 shadow-lg',
      info: 'bg-white border-blue-200 text-blue-800 shadow-lg',
    };

    const animationStyles = isLeaving ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100';

    return `${baseStyles} ${typeStyles[type]} ${animationStyles}`;
  };

  const getIcon = () => {
    const iconClass = 'w-5 h-5 flex-shrink-0';

    switch (type) {
      case 'success':
        return (
          <svg className={`${iconClass} text-green-600`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className={`${iconClass} text-red-600`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className={`${iconClass} text-yellow-600`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg className={`${iconClass} text-blue-600`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const ui = (
    <div className={getAlertStyles()}>
      <div className="flex items-start p-4 rounded-lg border">
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          {title && <h4 className="text-sm font-semibold mb-1 font-poppins">{title}</h4>}
          <p className="text-sm font-poppins">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black/5 transition-colors duration-200"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return createPortal(ui, document.body);
};

export default Alert;
