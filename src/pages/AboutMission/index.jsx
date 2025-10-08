import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// HERO фото (лежит: src/pages/AboutMission/public/images/about.png)
import aboutHero from './public/images/about.png';

// Иконки для блоков Core Values
// faith:  src/pages/AboutMission/public/images/fait.png
// compassion: src/pages/AboutMission/compassion.png  (именно тут!)
import faithIcon from './public/images/fait.png';
import compassionIcon from './compassion.png';
import serviceIcon from './public/images/service.png';

const AboutMission = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-[#F6F7F9]">
      {/* HERO */}
      <section className="w-full">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
          {/* Левая колонка */}
          <div>
            <h1 className="font-[Poppins] font-normal leading-[1.05] text-[28px] sm:text-[40px] lg:text-[56px] text-left">
              {t('aboutHeroTitle')}
              <span className="text-[#1F475B] font-medium"> {t('aboutFaith')}</span>
              <span className="text-[#1F475B] font-medium"> , </span>
              <span className="text-[#1F7A5B] font-medium">{t('aboutCompassion')}</span>
              <span className="text-[#1F475B] font-medium"> , {t('aboutAnd')} </span>
              <span className="text-[#1F7A5B] font-medium">{t('aboutService')}</span>
            </h1>

            <p className="mt-6 text-[#485563] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins] max-w-[680px]">
              {t('aboutDescription')}
            </p>

            <p className="mt-4 italic text-[#6B7280] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins]">
              {t('aboutMissionNote')}
            </p>
          </div>

          {/* Правая колонка — фото */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={aboutHero}
              alt="Mission community"
              className="
                rounded-lg shadow-lg w-full object-cover
                h-[300px] sm:h-[400px] lg:h-[540px]
                lg:scale-110 lg:translate-x-8
                transition-transform duration-500
              "
            />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-[#F9FAFB] py-16 lg:py-24">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[28px] sm:text-[32px] lg:text-[36px] font-[Poppins] font-semibold text-[#111827]">
            {t('aboutCoreValuesTitle')}
          </h2>
          <p className="mt-4 text-center text-[#6B7280] text-[16px] max-w-2xl mx-auto">
            {t('aboutCoreValuesDesc')}
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Faith */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#1F7A5B] rounded-md flex items-center justify-center">
                  <img src={faithIcon} alt="Faith icon" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#0f172a] capitalize">
                {t('aboutFaith')}
              </h3>
              <p className="mt-2 text-[15px] text-[#4B5563]">{t('aboutFaithDesc')}</p>
            </div>

            {/* Compassion */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#1F7A5B] rounded-md flex items-center justify-center">
                  <img
                    src={compassionIcon}
                    alt="Compassion icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#0f172a] capitalize">
                {t('aboutCompassion')}
              </h3>
              <p className="mt-2 text-[15px] text-[#4B5563]">{t('aboutCompassionDesc')}</p>
            </div>

            {/* Service */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#1F7A5B] rounded-md flex items-center justify-center">
                  <img src={serviceIcon} alt="Service icon" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#0f172a] capitalize">
                {t('aboutService')}
              </h3>
              <p className="mt-2 text-[15px] text-[#4B5563]">{t('aboutServiceDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (с лёгкими hover для ссылок/иконок) */}
      <footer className="w-full bg-[#333333] py-8 lg:py-10">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="w-full lg:w-[22%]">
              <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-white font-['Poppins'] mb-4">
                {t('brandName')}
              </h3>
              <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] mb-6 max-w-[94%]">
                {t('footerDesc')}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/images/img_frame_blue_gray_100.svg"
                  alt="Facebook"
                  className="w-[10px] h-[16px] transition-transform duration-200 hover:scale-110"
                />
                <img
                  src="/images/img_frame_blue_gray_100_16x14.svg"
                  alt="Twitter"
                  className="w-[14px] h-[16px] transition-transform duration-200 hover:scale-110"
                />
                <img
                  src="/images/youtube.svg"
                  alt="Youtube"
                  className="w-[18px] h-[16px] transition-transform duration-200 hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Navigation */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  {[
                    { href: '/about-mission', label: t('about') },
                    { href: '/projects', label: t('projects') },
                    { href: '/testimonies', label: t('testimonies') },
                    { href: '/training', label: t('training') },
                    { href: '/story', label: t('story') },
                    { href: '/shop', label: t('shop') },
                    { href: '/questions-contact', label: t('contact') },
                    { href: '/donation', label: t('donate') },
                  ].map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="relative block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] transition-colors hover:text-white
                                 after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="w-full lg:w-[48%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('contact')}
                </h4>
                <div className="space-y-2 max-w-[84%]">
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('phoneNumber')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('emailAddress')}
                  </p>
                  <div>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      {t('addressLine')}
                    </p>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      Faith City, FC 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal */}
              <div className="w-full lg:w-[42%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('legal')}
                </h4>
                <div className="space-y-2">
                  {[
                    { href: '/privacy-policy', label: t('privacyPolicy') },
                    { href: '/terms-of-service', label: t('termsOfService') },
                    { href: '/cookie-policy', label: t('cookiePolicy') },
                  ].map((l) => (
                    <Link
                      key={l.label}
                      to={l.href}
                      className="relative block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] transition-colors hover:text-white
                                 after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-gray-600">
            <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutMission;
