import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Footer from '../../components/common/Footer';
import { AboutSkeleton } from '../../components/skeletons';

const aboutHero = '/images/aboutus.jpeg';

const AboutMission = () => {
  const { t } = useLanguage();
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  React.useEffect(() => {
    const imageUrls = [aboutHero];
    let loadedCount = 0;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      img.src = url;
    });
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="w-full bg-[#F6F7F9]">
        <AboutSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F6F7F9]">
      {/* HERO */}
      <section className="w-full">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
          {/* Левая колонка */}
          <div>
            <h1 className="font-[Poppins] font-normal leading-[1.05] text-[28px] sm:text-[40px] lg:text-[56px] text-left text-[#1f2937]">
              {t('aboutHeroTitle')}
              <span className="text-[#3c8a7a] font-medium"> {t('aboutFaith')}</span>
              <span className="text-[#1f2937] font-medium"> , </span>
              <span className="text-[#3c8a7a] font-medium">{t('aboutCompassion')}</span>
              <span className="text-[#1f2937] font-medium"> , {t('aboutAnd')} </span>
              <span className="text-[#3c8a7a] font-medium">{t('aboutService')}</span>
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
            <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#3c8a7a] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#1f2937] capitalize">
                {t('aboutFaith')}
              </h3>
              <p className="mt-2 text-[15px] text-[#4B5563]">{t('aboutFaithDesc')}</p>
            </div>

            {/* Compassion */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#3c8a7a] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#1f2937] capitalize">
                {t('aboutCompassion')}
              </h3>
              <p className="mt-2 text-[15px] text-[#4B5563]">{t('aboutCompassionDesc')}</p>
            </div>

            {/* Service */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[#3c8a7a] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-[#1f2937] capitalize">
                {t('aboutService')}
              </h3>
              <p className="mt-2 text-[15px] text-[#4B5563]">{t('aboutServiceDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutMission;
