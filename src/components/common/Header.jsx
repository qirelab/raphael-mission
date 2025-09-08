import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { name: t('projects'), href: '/projects' },
    { name: t('about'), href: '/about' },
    { name: t('training'), href: '/training' },
    { name: t('shop'), href: '/shop' },
    { name: t('testimonies'), href: '/testimonies' },
    { name: t('story'), href: '/story' },
    { name: t('contact'), href: '/contact' }
  ];

  const projectSubmenuItems = [
    { name: t('streetEvangelismTitle'), href: '/projects/street-evangelism' },
    { name: t('tentEvangelismTitle'), href: '/projects/tent-evangelism' },
    { name: t('personalEvangelismTitle'), href: '/projects/personal-evangelism' }
  ];

  return (
    <header className="w-full bg-global-6 shadow-[0px_1px_2px_#0000000c]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-[20px]">
            <a href="/" className="flex items-center gap-[20px]">
              <img 
                src="/images/img_logo_3.png" 
                alt="Raphael Mission Logo" 
                className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px]" 
              />
              <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-poppins font-bold leading-[27px] sm:leading-[30px] md:leading-[36px] text-left text-header-1">
                Raphael Mission
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-between items-center w-[70%]">
            <nav className="flex gap-[24px] justify-center items-center">
              {/* Other Menu Items */}
              {menuItems?.map((item, index) => (
                <a
                  key={index}
                  href={item?.href}
                  role="menuitem"
                  className="text-[16px] font-poppins font-normal leading-[24px] text-left text-header-2 hover:text-header-1 transition-colors"
                >
                  {item?.name}
                </a>
              ))}
            </nav>
            {/* Desktop Donate Button и LanguageSwitcher */}
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
