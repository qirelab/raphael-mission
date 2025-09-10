import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const closeTimeout = useRef(null);
  const { t } = useLanguage();

  const menuItems = [
    { name: t('projects'), href: '/projects' },
    { name: t('about'), href: '/about-mission' },
    { name: t('training'), href: '/training' },
    { name: t('shop'), href: '/shop' },
    { name: t('testimonies'), href: '/testimonies' },
    { name: t('story'), href: '/story' },
    { name: t('contact'), href: '/questions-contact' }
  ];

  const projectLinks = [
    { name: t('streetEvangelismTitle'), href: '/projects/street-evangelism' },
    { name: t('tentEvangelismTitle'), href: '/projects/tent-evangelism' },
    { name: t('personalEvangelismTitle'), href: '/projects/personal-evangelism' },
    { name: t('socialProjectsTitle'), href: '/projects/social-projects' },
    { name: t('artEvangelismTitle'), href: '/projects/art-evangelism' },
    { name: t('churchSupportTitle'), href: '/projects/church-support' },
    { name: t('healingMinistryTitle'), href: '/projects/healing-ministry' }
  ];

  const openProjects = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsProjectsOpen(true);
  };

  const scheduleCloseProjects = () => {
    closeTimeout.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 200); // задержка чтобы меню не мигало
  };

  return (
    <header className="w-full bg-global-6 shadow-[0px_1px_2px_#0000000c]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center gap-[20px]">
            <a href="/" className="flex items-center gap-[20px]">
              <img
                src="/images/img_logo_3.png"
                alt="Raphael Mission Logo"
                className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px]"
              />
              <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-poppins font-bold text-header-1">
                Raphael Mission
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-between items-center w-[70%]">
            <nav className="flex gap-[24px] justify-center items-center">
              {menuItems.map((item, index) =>
                item.name === t('projects') ? (
                  <div
                    key={index}
                    className="relative flex items-center gap-1"
                    onMouseEnter={openProjects}
                    onMouseLeave={scheduleCloseProjects}
                  >
                    <a
                      href={item.href}
                      role="menuitem"
                      className="flex items-center gap-1 text-[16px] font-poppins font-normal text-header-2 hover:text-header-1 transition-colors"
                    >
                      {item.name}
                      {/* стрелка */}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isProjectsOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>

                    {isProjectsOpen && (
                      <div
                        className="absolute left-0 top-full mt-1 min-w-[220px] bg-white shadow-lg rounded-xl z-50 flex flex-col"
                        onMouseEnter={openProjects}
                        onMouseLeave={scheduleCloseProjects}
                      >
                        {projectLinks.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="px-5 py-3 text-[15px] font-poppins font-normal text-header-2 hover:bg-gray-100 hover:text-header-1 transition-colors rounded"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    role="menuitem"
                    className="text-[16px] font-poppins font-normal text-header-2 hover:text-header-1 transition-colors"
                  >
                    {item.name}
                  </a>
                )
              )}
            </nav>

            {/* Donate + Language */}
            <div className="flex items-center gap-4">
              <a href="/donation">
                <Button
                  variant="primary"
                  className="pt-[8px] pr-[16px] pb-[8px] pl-[22px] rounded-[8px]"
                >
                  {t('donate')}
                </Button>
              </a>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="block lg:hidden p-2"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
