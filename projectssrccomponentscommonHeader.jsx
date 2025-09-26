import React, { useState } from 'react';
import Button from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const menuItems = [
    { name: 'About', href: '/about' },
    { name: 'Training', href: '/training' },
    { name: 'Shop', href: '/shop' },
    { name: 'Testimonies', href: '/testimonies' },
    { name: 'Story', href: '/story' },
    { name: 'Contact', href: '/contact' }
  ];

  const projectSubmenuItems = [
    { name: 'Street Evangelism', href: '/projects/street-evangelism' },
    { name: 'Tent Evangelism', href: '/projects/tent-evangelism' },
    { name: 'Personal Evangelism', href: '/projects/personal-evangelism' }
  ];

  return (
    <header className="w-full bg-global-6 shadow-[0px_1px_2px_#0000000c] mr-[112px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start py-3">
          {/* Mobile Street Evangelism Text */}
          <div className="block lg:hidden">
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-poppins font-normal leading-[18px] sm:leading-[20px] md:leading-[24px] text-center text-global-5">
              Street evangelism
            </p>
          </div>

          {/* Logo and Brand */}
          <div className="flex items-center gap-[20px] sm:gap-[26px]">
            <img 
              src="/images/img_logo_3.png" 
              alt="Raphael Mission Logo" 
              className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px]" 
            />
            <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-poppins font-bold leading-[27px] sm:leading-[30px] md:leading-[36px] text-left text-header-1">
              Raphael Mission
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-between items-center w-[70%]">
            <nav className="flex gap-[24px] justify-center items-center">
              {/* Projects Dropdown */}
              <div className="relative">
                <button
                  className="flex gap-[6px] justify-center items-center"
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isProjectsOpen}
                >
                  <span className="text-[16px] font-poppins font-normal leading-[24px] text-left text-header-2">
                    Projects
                  </span>
                  <img 
                    src="/images/img_arrow_down.svg" 
                    alt="Dropdown arrow" 
                    className="w-[10px] h-[6px] mb-[6px]" 
                  />
                </button>
                
                {/* Projects Submenu */}
                {isProjectsOpen && (
                  <ul 
                    role="menu" 
                    className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                  >
                    {projectSubmenuItems?.map((item, index) => (
                      <li key={index} role="menuitem">
                        <a 
                          href={item?.href}
                          className="block px-4 py-2 text-sm text-header-2 hover:bg-gray-100"
                        >
                          {item?.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

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

            {/* Desktop Donate Button */}
            <Button
              variant="primary"
              className="pt-[8px] pr-[16px] pb-[8px] pl-[22px] rounded-[8px]"
              onClick={() => {}}
            >
              Donate
            </Button>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Projects with Submenu */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                >
                  <span className="text-[16px] font-poppins font-normal text-header-2">Projects</span>
                  <img 
                    src="/images/img_arrow_down.svg" 
                    alt="Dropdown arrow" 
                    className="w-[10px] h-[6px]" 
                  />
                </button>
                {isProjectsOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {projectSubmenuItems?.map((item, index) => (
                      <li key={index}>
                        <a 
                          href={item?.href}
                          className="block text-sm text-header-2 hover:text-header-1"
                        >
                          {item?.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Other Mobile Menu Items */}
              {menuItems?.map((item, index) => (
                <a
                  key={index}
                  href={item?.href}
                  className="text-[16px] font-poppins font-normal text-header-2 hover:text-header-1 transition-colors"
                >
                  {item?.name}
                </a>
              ))}

              {/* Mobile Donate Button */}
              <Button
                variant="primary"
                fullWidth
                className="mt-4 rounded-[8px]"
                onClick={() => {}}
              >
                Donate
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
