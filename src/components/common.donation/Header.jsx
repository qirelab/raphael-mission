import React, { useState } from 'react';
import Button from '../ui/Button';

// ВАЖНО: путь относительный к файлу Header.jsx (скорее всего src/components/common/Header.jsx)
import capIcon from '../common.donation/public/images/cap.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Mission', href: '#mission' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="w-full bg-global-4 border-b border-global-2 shadow-[0px_1px_2px_#0000000c]">
      <div className="w-full max-w-[1440px] mx-auto px-[14px] py-[14px]">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-inter font-bold leading-[22px] sm:leading-[26px] md:leading-[30px] text-global-2">
              Raphael Mission
            </h1>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="block lg:hidden p-2"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-global-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-[54px]">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                className="text-[14px] font-inter font-medium leading-[17px] text-global-3 hover:text-global-2 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Donate (desktop) */}
          <div className="hidden lg:block">
            <Button
              variant="primary"
              className="bg-global-1 text-global-7 px-[20px] pl-[26px] py-[8px] rounded-[18px] text-[14px] font-inter font-medium leading-[17px]"
            >
              Donate
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:hidden mt-4 pb-4 border-t border-global-2 pt-4`}>
          <div className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                className="text-[14px] font-inter font-medium leading-[17px] text-global-3 hover:text-global-2 transition-colors duration-200 text-left py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                fullWidth
                className="bg-global-1 text-global-7 py-[8px] rounded-[18px] text-[14px] font-inter font-medium leading-[17px]"
              >
                Donate
              </Button>
            </div>
          </div>
        </nav>

        {/* Карточка доната с картинкой cap.png */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg flex items-center gap-4 max-w-[520px]">
          <img
            src={capIcon}
            alt="Clean water"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-[16px] font-semibold text-global-2">$25</p>
            <p className="text-[14px] text-global-3">
              Clean water for a family of 5 for one month
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
