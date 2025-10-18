import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAlert } from '../hooks/useAlert';

const CookieConsent = () => {
  const { t } = useLanguage();
  const { success, info } = useAlert();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Проверяем, принял ли пользователь cookie
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Показываем баннер с небольшой задержкой для плавности
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 10);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    success(t('alertCookiesAccepted'), t('alertCookiesAcceptedTitle'));
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    info(t('alertCookiesRejected'), t('alertCookiesRejectedTitle'));
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Backdrop Blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative bg-white border-t border-gray-200 shadow-2xl">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Icon & Text */}
            <div className="flex items-start gap-4 flex-1">
              {/* Cookie Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-[#3c8a7a]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#3c8a7a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1f2937] font-poppins mb-2">
                  🍪 {t('cookieConsentTitle')}
                </h3>
                <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#4b5563] font-poppins mb-3">
                  {t('cookieConsentMessage')}
                </p>
                <Link
                  to="/cookie-policy"
                  className="text-[14px] sm:text-[15px] text-[#3c8a7a] font-semibold font-poppins hover:underline inline-flex items-center gap-1"
                >
                  {t('cookieConsentLearnMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-[#4b5563] font-semibold font-poppins hover:bg-gray-50 transition-all duration-200 text-[15px] sm:text-[16px]"
              >
                {t('cookieConsentReject')}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#3c8a7a] to-[#2F7D6D] text-white font-semibold font-poppins hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-[15px] sm:text-[16px]"
              >
                {t('cookieConsentAccept')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
