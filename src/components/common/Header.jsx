// src/components/common/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { projectsService } from '../../services/projectsService';
import MobileMenu from '../MobileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [projectLinks, setProjectLinks] = useState([]);
  const closeTimeout = useRef(null);
  const { t, language } = useLanguage();

  const menuItems = [
    { name: t('projects'), href: '/projects' },
    { name: t('about'), href: '/about-mission' },
    { name: t('training'), href: '/training' },
    { name: t('shop'), href: '/shop' },
    { name: t('testimonies'), href: '/testimonies' },
    { name: t('story'), href: '/story' },
    { name: t('contact'), href: '/questions-contact' },
  ];

  // Load projects from database
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await projectsService.getActive();
        const links = projects.map((project) => ({
          name: project[`title_${language}`] || project.title_en,
          href: `/projects/${project.slug}`,
        }));
        setProjectLinks(links);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjectLinks([]);
      }
    };

    loadProjects();
  }, [language]);

  const openProjects = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsProjectsOpen(true);
  };

  const scheduleCloseProjects = () => {
    closeTimeout.current = setTimeout(() => setIsProjectsOpen(false), 150);
  };

  return (
    <header className="w-full bg-global-6 shadow-[0px_1px_2px_#0000000c]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-2.5 min-h-[60px]">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <a
              href="/"
              className="flex items-center gap-3 sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-1/40 rounded-md"
            >
              <img
                src="/images/logo.svg"
                alt="Raphael Mission Logo"
                className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px]"
              />
              <h1 className="text-[18px] sm:text-[20px] font-poppins font-bold text-header-1 whitespace-nowrap">
                {t('brandName')}
              </h1>
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center mx-auto gap-5 xl:gap-7 text-[15px] xl:text-[16px]">
            {menuItems.map((item, index) =>
              item.name === t('projects') ? (
                <div
                  key={index}
                  className="relative flex items-center"
                  onMouseEnter={openProjects}
                  onMouseLeave={scheduleCloseProjects}
                >
                  <a
                    href={item.href}
                    role="menuitem"
                    aria-expanded={isProjectsOpen}
                    aria-haspopup="true"
                    className="relative flex items-center gap-1 font-poppins text-header-2
                               border-b-2 border-transparent
                               transition-all duration-200 ease-out
                               hover:text-header-1 hover:border-header-1 hover:-translate-y-[1px]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-1/40 rounded-md px-1"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : 'rotate-0'}`}
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

                  {/* Dropdown under "Projects" */}
                  {isProjectsOpen && (
                    <div
                      className="absolute left-0 top-full mt-2 w-max min-w-[260px] bg-white shadow-lg ring-1 ring-black/5 rounded-xl z-50 flex flex-col py-2"
                      onMouseEnter={openProjects}
                      onMouseLeave={scheduleCloseProjects}
                    >
                      {projectLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="px-4 py-2.5 text-[14px] font-poppins text-header-2 rounded-md whitespace-nowrap
                                     transition-all duration-150
                                     border-l-4 border-transparent
                                     hover:bg-gray-100 hover:text-header-1 hover:pl-5 hover:border-header-1
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-1/30"
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
                  className="relative font-poppins text-header-2 px-1 whitespace-nowrap
                             border-b-2 border-transparent
                             transition-all duration-200 ease-out
                             hover:text-header-1 hover:border-header-1 hover:-translate-y-[1px]
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-1/40 rounded-md"
                >
                  {item.name}
                </a>
              )
            )}
          </nav>

          {/* Right: Donate + Language */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4 flex-1 justify-end">
            <a href="/donation" className="shrink-0">
              <Button
                variant="primary"
                className="py-[8px] px-[18px] rounded-[10px] text-[14px] leading-[20px] transition-transform duration-200 hover:-translate-y-[1px]"
              >
                {t('donate')}
              </Button>
            </a>
            <div className="shrink-0">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-1 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-1/40"
            aria-label="Open menu"
            type="button"
            onClick={() => setOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Header;
