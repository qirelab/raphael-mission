import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projectsService } from '../services/projectsService';

export default function MobileMenu({ open, onClose }) {
  const { t, language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [projectLinks, setProjectLinks] = useState([]);

  // Load projects from database
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await projectsService.getActive();
        const links = projects.map((project) => ({
          label: project[`title_${language}`] || project.title_en,
          to: `/projects/${project.slug}`,
        }));
        setProjectLinks(links);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjectLinks([]);
      }
    };

    loadProjects();
  }, [language]);

  const links = [
    { labelKey: 'projects', to: '/projects', hasDropdown: true, dropdownItems: projectLinks },
    { labelKey: 'about', to: '/about-mission' },
    { labelKey: 'training', to: '/training' },
    { labelKey: 'shop', to: '/shop' },
    { labelKey: 'testimonies', to: '/testimonies' },
    { labelKey: 'story', to: '/story' },
    { labelKey: 'contact', to: '/questions-contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  ];

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const handleLanguageChange = (code) => {
    setLanguage(code);
  };

  const ui = (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Backdrop with blur */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
        style={{
          backdropFilter: isVisible ? 'blur(8px)' : 'blur(0px)',
        }}
      />

      {/* Menu Panel */}
      <div
        className="absolute top-0 right-0 h-full w-[85%] max-w-[380px] bg-gradient-to-br from-white to-gray-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out"
        style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
            <div className="text-lg font-bold text-[#2F7D6D] font-poppins">{t('brandName')}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-gray-600 group-hover:text-[#2F7D6D] transition-colors"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Navigation Links */}
          <nav className="space-y-2 mb-8">
            {links.map((link, index) => (
              <div key={link.to}>
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.labelKey ? null : link.labelKey)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-[#3c8a7a]/10 hover:text-[#2F7D6D] transition-all duration-200 group font-poppins"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isVisible ? 'slideInRight 0.4s ease-out forwards' : 'none',
                        opacity: isVisible ? 1 : 0,
                      }}
                    >
                      <span className="text-base font-medium">{t(link.labelKey)}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        className={`text-gray-400 group-hover:text-[#2F7D6D] transition-all duration-200 ${
                          openDropdown === link.labelKey ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openDropdown === link.labelKey
                          ? 'max-h-[500px] opacity-100 mt-2'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 space-y-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-[#3c8a7a]/10 hover:text-[#2F7D6D] transition-all duration-200 font-poppins"
                          >
                            {item.label || (item.labelKey ? t(item.labelKey) : '')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-[#3c8a7a]/10 hover:text-[#2F7D6D] transition-all duration-200 group font-poppins"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isVisible ? 'slideInRight 0.4s ease-out forwards' : 'none',
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    <span className="text-base font-medium">{t(link.labelKey)}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="mb-8">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4 font-poppins">
              {t('language')}
            </div>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-poppins ${
                    language === lang.code
                      ? 'bg-[#3c8a7a] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-base font-medium flex-1 text-left">{lang.label}</span>
                  {language === lang.code && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="text-white"
                      fill="none"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Donate Button */}
          <Link
            to="/donation"
            onClick={onClose}
            className="block text-center rounded-2xl py-4 shadow-lg bg-gradient-to-r from-[#3c8a7a] to-[#2F7D6D] text-white text-lg font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-poppins"
          >
            {t('donate')}
          </Link>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#3c8a7a]/10 flex items-center justify-center transition-colors duration-200 group"
            >
              <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#3c8a7a]/10 flex items-center justify-center transition-colors duration-200 group"
            >
              <img
                src="/images/img_frame_blue_gray_100_16x14.svg"
                alt="Twitter"
                className="w-4 h-4"
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#3c8a7a]/10 flex items-center justify-center transition-colors duration-200 group"
            >
              <img src="/images/youtube.svg" alt="Youtube" className="w-5 h-4" />
            </a>
          </div>
          <div className="text-center text-xs text-gray-500 font-poppins">{t('copyright')}</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );

  return createPortal(ui, document.body);
}
