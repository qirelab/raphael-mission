import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTermsOfService } from '../../context/TermsOfServiceContext';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const { t, language } = useLanguage();
  const { pageData } = useTermsOfService();

  // Resolve a localized field from the DB row with graceful fallbacks:
  //   db[<base>_<lang>] → db[<base>_en] → translation(<translationKey>)
  const pick = (base, translationKey) => {
    if (pageData) {
      const localized = pageData[`${base}_${language}`];
      if (localized && localized.trim() !== '') return localized;
      const englishFallback = pageData[`${base}_en`];
      if (englishFallback && englishFallback.trim() !== '') return englishFallback;
    }
    return t(translationKey);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#3c8a7a] to-[#2F7D6D] py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-white font-poppins mb-4">
              {pick('hero_title', 'termsTitle')}
            </h1>
            <p className="text-[16px] sm:text-[18px] text-white/90 font-poppins">
              {pick('hero_subtitle', 'termsSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('section1_title', 'termsSection1Title')}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#4b5563] font-poppins mb-4">
                {pick('section1_content', 'termsSection1Content')}
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('section2_title', 'termsSection2Title')}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#4b5563] font-poppins mb-4">
                {pick('section2_content', 'termsSection2Content')}
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('section3_title', 'termsSection3Title')}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#4b5563] font-poppins mb-4">
                {pick('section3_content', 'termsSection3Content')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[18px] text-[#4b5563] font-poppins">
                <li>{pick('section3_item1', 'termsSection3Item1')}</li>
                <li>{pick('section3_item2', 'termsSection3Item2')}</li>
                <li>{pick('section3_item3', 'termsSection3Item3')}</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('section4_title', 'termsSection4Title')}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#4b5563] font-poppins mb-4">
                {pick('section4_content', 'termsSection4Content')}
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('section5_title', 'termsSection5Title')}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#4b5563] font-poppins mb-4">
                {pick('section5_content', 'termsSection5Content')}
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('section6_title', 'termsSection6Title')}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#4b5563] font-poppins mb-4">
                {pick('section6_content', 'termsSection6Content')}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-[12px] shadow-[0px_10px_15px_#00000019] p-6 sm:p-8 mt-12">
              <h3 className="text-[20px] sm:text-[24px] font-bold text-[#1f2937] font-poppins mb-4">
                {pick('contact_title', 'termsContactTitle')}
              </h3>
              <p className="text-[16px] sm:text-[18px] text-[#4b5563] font-poppins mb-4">
                {pick('contact_content', 'termsContactContent')}
              </p>
              <p className="text-[16px] sm:text-[18px] text-[#3c8a7a] font-semibold font-poppins">
                {t('emailAddress')}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              to={`/${language}`}
              className="inline-block px-8 py-3 bg-[#3c8a7a] text-white rounded-lg font-semibold font-poppins hover:bg-[#2F7D6D] transition-colors duration-200"
            >
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsOfService;
