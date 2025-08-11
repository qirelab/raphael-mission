import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="w-full bg-[#ffffff] shadow-[0px_10px_15px_#00000019]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3 lg:py-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-[14px]">
            <img 
              src="/images/img_logo_3.png" 
              alt="Raphael Mission Logo" 
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[62px] lg:h-[62px]" 
            />
            <h1 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold leading-[27px] sm:leading-[30px] lg:leading-[36px] text-[#1f2937] font-['Poppins']">
              {t('brandName')}
            </h1>
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button 
            className="block lg:hidden p-2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50 lg:z-auto`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-[24px] p-4 lg:p-0">
              {/* Language Switcher */}
              <div className="lg:order-last">
                <LanguageSwitcher />
              </div>
              {/* Projects Link */}
              <Link 
                to="/projects"
                className="flex items-center gap-[6px] text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
              >
                {t('projects')}
              </Link>


              {/* About Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center gap-[6px] text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                  onClick={() => setAboutOpen(!aboutOpen)}
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                >
                  {t('about')}
                  <img 
                    src="/images/img_arrow_down.svg" 
                    alt="dropdown arrow" 
                    className="w-[10px] h-[6px]" 
                  />
                </button>
                {aboutOpen && (
                  <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[150px] z-10" role="menu">
                    <li role="menuitem" className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#374151]">{t('ourMission')}</li>
                    <li role="menuitem" className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#374151]">{t('ourTeam')}</li>
                    <li role="menuitem" className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#374151]">{t('history')}</li>
                  </ul>
                )}
              </div>

              {/* Regular Menu Items */}
              <button 
                className="text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
              >
                {t('fund')}
              </button>
              <button 
                className="text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
              >
                {t('training')}
              </button>
              <button 
                className="text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
              >
                {t('shop')}
              </button>
              <button 
                className="text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
                onClick={() => {
                  const element = document.getElementById('testimonies');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('testimonies')}
              </button>
              <button 
                className="text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
              >
                {t('story')}
              </button>
              <button 
                className="text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-[#374151] font-['Poppins'] hover:text-[#3c8a7a] transition-colors"
                role="menuitem"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('contact')}
              </button>

              {/* Donate Button */}
              <div className="mt-4 lg:mt-0">
                <Button 
                  variant="primary"
                  className="pt-[8px] pr-[16px] pb-[8px] pl-[22px] text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] text-center text-[#ffffff] font-['Poppins']"
                >
                  {t('donate')}
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;