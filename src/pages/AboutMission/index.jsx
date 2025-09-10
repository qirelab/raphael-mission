import React from 'react';
import Header from '../../components/common/Header';
import { useLanguage } from '../../context/LanguageContext';

// HERO фото (лежит: src/pages/AboutMission/public/images/about.png)
import aboutHero from './public/images/about.png';

// Иконки для блоков Core Values
// faith:  src/pages/AboutMission/public/images/fait.png
// compassion: src/pages/AboutMission/compassion.png  (именно тут!)
// service: src/pages/AboutMission/public/images/service.png
import faithIcon from './public/images/fait.png';
import compassionIcon from './compassion.png';
import serviceIcon from './public/images/service.png';

const AboutMission = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-[#F6F7F9]">
      {/* Header */}
      <Header />

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
              <h3 className="text-[18px] font-semibold text-[#1F475B]">{t('aboutFaith')}</h3>
              <p className="mt-2 text-[15px] text-[#6B7280]">
                {t('aboutFaithDesc')}
              </p>
            </div>

            {/* Compassion */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#1F7A5B] rounded-md flex items-center justify-center">
                  <img src={compassionIcon} alt="Compassion icon" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#1F475B]">{t('aboutCompassion')}</h3>
              <p className="mt-2 text-[15px] text-[#6B7280]">
                {t('aboutCompassionDesc')}
              </p>
            </div>

            {/* Service */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#1F7A5B] rounded-md flex items-center justify-center">
                  <img src={serviceIcon} alt="Service icon" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#1F475B]">{t('aboutService')}</h3>
              <p className="mt-2 text-[15px] text-[#6B7280]">
                {t('aboutServiceDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMission;
