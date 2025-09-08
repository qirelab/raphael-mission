import React, { useState } from 'react';
import Button from '../ui/Button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Mission', href: '#mission' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Contact', href: '#contact' }
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

          {/* Hamburger Menu Icon (Mobile only) */}
          <button 
            className="block lg:hidden p-2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-global-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[54px]">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className="text-[14px] font-inter font-medium leading-[17px] text-global-3 hover:text-global-2 transition-colors duration-200"
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Desktop Donate Button */}
          <div className="hidden lg:block">
            <Button
              variant="primary"
              className="bg-global-1 text-global-7 px-[20px] pl-[26px] py-[8px] rounded-[18px] text-[14px] font-inter font-medium leading-[17px]"
            >
              Donate
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:hidden mt-4 pb-4 border-t border-global-2 pt-4`}>
          <div className="flex flex-col space-y-3">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className="text-[14px] font-inter font-medium leading-[17px] text-global-3 hover:text-global-2 transition-colors duration-200 text-left py-2"
              >
                {item?.label}
              </button>
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
      </div>
    </header>
  );
};

export default Header;