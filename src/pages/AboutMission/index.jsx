import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAbout } from '../../context/AboutContext';
import Footer from '../../components/common/Footer';
import { AboutSkeleton } from '../../components/skeletons';

const DEFAULT_HERO_IMAGE = '/images/image3.jpeg';

const AboutMission = () => {
  const { t, language } = useLanguage();
  const { aboutData, loading: aboutLoading } = useAbout();
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  // Resolve a localized field from the DB row with graceful fallbacks:
  //   db[<base>_<lang>]  →  db[<base>_en]  →  translation(<translationKey>)
  const pick = (base, translationKey) => {
    if (aboutData) {
      const localized = aboutData[`${base}_${language}`];
      if (localized && localized.trim() !== '') return localized;
      const englishFallback = aboutData[`${base}_en`];
      if (englishFallback && englishFallback.trim() !== '') return englishFallback;
    }
    return t(translationKey);
  };

  const heroImage =
    (aboutData?.hero_image_url && aboutData.hero_image_url.trim() !== ''
      ? aboutData.hero_image_url
      : DEFAULT_HERO_IMAGE);

  React.useEffect(() => {
    let cancelled = false;
    setImagesLoaded(false);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setImagesLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setImagesLoaded(true);
    };
    img.src = heroImage;
    return () => {
      cancelled = true;
    };
  }, [heroImage]);

  if (aboutLoading || !imagesLoaded) {
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
            <h1 className="font-[Poppins] font-semibold leading-[1.1] text-[28px] sm:text-[40px] lg:text-[56px] text-left text-[#3c8a7a]">
              {pick('hero_title', 'aboutHeroTitle')}
            </h1>

            <p className="mt-6 text-[#485563] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins]">
              {pick('hero_paragraph1', 'aboutParagraph1')}
            </p>

            <p className="mt-4 italic text-[#6B7280] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins]">
              {pick('hero_paragraph2', 'aboutParagraph2')}
            </p>

            <p className="mt-4 text-[#485563] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins]">
              {pick('hero_paragraph3', 'aboutParagraph3')}
            </p>

            <p className="mt-4 text-[#485563] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins]">
              {pick('hero_paragraph4', 'aboutParagraph4')}
            </p>

            <p className="mt-4 text-[#485563] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-[Poppins]">
              {pick('hero_paragraph5', 'aboutParagraph5')}
            </p>
          </div>

          {/* Правая колонка — фото */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Mission community"
              className="
                rounded-lg shadow-lg w-full max-w-[450px] h-auto object-contain
              "
            />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-[#F9FAFB] py-16 lg:py-24">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[28px] sm:text-[32px] lg:text-[36px] font-[Poppins] font-semibold text-[#111827]">
            {pick('values_title', 'aboutCoreValuesTitle')}
          </h2>
          <p className="mt-4 text-center text-[#6B7280] text-[16px] max-w-3xl mx-auto">
            {pick('values_desc', 'aboutCoreValuesDesc')}
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-[18px] font-semibold text-[#1f2937]">
                {pick('value1_title', 'aboutValue1Title')}
              </h3>
              <p className="mt-3 text-[15px] text-[#4B5563]">
                {pick('value1_desc', 'aboutValue1Desc')}
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-[18px] font-semibold text-[#1f2937]">
                {pick('value2_title', 'aboutValue2Title')}
              </h3>
              <p className="mt-3 text-[15px] text-[#4B5563]">
                {pick('value2_desc', 'aboutValue2Desc')}
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-[18px] font-semibold text-[#1f2937]">
                {pick('value3_title', 'aboutValue3Title')}
              </h3>
              <p className="mt-3 text-[15px] text-[#4B5563]">
                {pick('value3_desc', 'aboutValue3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutMission;
