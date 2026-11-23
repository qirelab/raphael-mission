import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTestimoniesContext } from '../../context/TestimoniesContext';
import { useTestimoniesHero } from '../../context/TestimoniesHeroContext';
import Footer from '../../components/common/Footer';
import { TestimonialsGridSkeleton, HeroSkeleton } from '../../components/skeletons';
import TestimoniesHero, { DEFAULT_HERO_BACKGROUND } from './TestimoniesHero';

const TestimoniesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { testimonies: testimoniesRaw, loading } = useTestimoniesContext();
  const { heroData } = useTestimoniesHero();

  // Resolve a localized hero field from the DB row with graceful fallbacks:
  //   db[<base>_<lang>] → db[<base>_en] → translation(<translationKey>)
  const heroPick = (base, translationKey) => {
    if (heroData) {
      const localized = heroData[`${base}_${language}`];
      if (localized && localized.trim() !== '') return localized;
      const englishFallback = heroData[`${base}_en`];
      if (englishFallback && englishFallback.trim() !== '') return englishFallback;
    }
    return t(translationKey);
  };

  const heroBackground =
    heroData?.background_image_url && heroData.background_image_url.trim() !== ''
      ? heroData.background_image_url
      : DEFAULT_HERO_BACKGROUND;

  const handleShareStoryClick = () => {
    navigate(`/${language}`);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Transform testimonies based on current language (client-side, no API call)
  const testimonials = useMemo(() => {
    return testimoniesRaw.map((t) => ({
      id: t.id,
      name: t[`name_${language}`] || t.name_en || t.name,
      location: t[`title_${language}`] || t.title_en || '',
      image: t.image_url || '/images/mariasantos.png',
      quote: t[`content_${language}`] || t.content_en,
    }));
  }, [testimoniesRaw, language]);

  if (loading) {
    return (
      <div className="w-full bg-global-7">
        <HeroSkeleton />
        <section className="w-full bg-white py-12 lg:py-16">
          <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="animate-pulse bg-gray-200 rounded h-10 w-64 mx-auto mb-4"></div>
              <div className="animate-pulse bg-gray-200 rounded h-6 w-96 mx-auto"></div>
            </div>
            <TestimonialsGridSkeleton count={6} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-global-7">
      {/* ===== HERO ===== */}
      <TestimoniesHero
        title={heroPick('title', 'testimoniesPageTitle')}
        titleHighlight={heroPick('title_highlight', 'testimoniesPageTitleHighlight')}
        description={heroPick('description', 'testimoniesPageDescription')}
        background={heroBackground}
      />

      {/* Testimonials Grid */}
      <section className="w-full bg-global-7 py-[32px] sm:py-[48px] md:py-[64px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px]">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-global-7 rounded-[12px] p-[24px] sm:p-[28px] md:p-[32px] shadow-[0px_10px_15px_rgba(0,0,0,0.1)] hover:shadow-[0px_15px_25px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                >
                  <div className="flex items-center mb-[20px] sm:mb-[24px]">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-[64px] h-[64px] rounded-[32px] object-cover"
                    />
                    <div className="ml-[16px]">
                      <h3 className="text-[16px] font-semibold leading-[24px] text-global-2 mb-[2px]">
                        {testimonial.name}
                      </h3>
                      <p className="text-[14px] font-normal leading-[21px] text-global-5">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-[16px] font-normal leading-[24px] text-global-4">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {t('noTestimonies') || 'No testimonies yet'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {t('noTestimoniesDesc') ||
                    'Be the first to share your story! Add testimonies through the admin panel.'}
                </p>
                <Button
                  variant="secondary"
                  onClick={handleShareStoryClick}
                  className="bg-[#2F7D6D] text-white px-6 py-3 rounded-lg hover:bg-[#266b5a] transition-colors"
                >
                  {t('shareYourStoryBtn') || 'Share Your Story'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="w-full bg-global-1 py-[32px] sm:py-[48px] md:py-[64px] mt-[16px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold leading-[32px] sm:leading-[36px] md:leading-[40px] text-global-7 mb-[16px] sm:mb-[20px] md:mb-[24px]">
              {heroPick('share_title', 'shareYourStoryTitle')}
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[26px] sm:leading-[29px] md:leading-[33px] text-global-7 mb-[20px] sm:mb-[22px] md:py-[24px] max-w-4xl mx-auto">
              {heroPick('share_description', 'shareYourStoryDesc')}
            </p>
            <Button
              variant="secondary"
              onClick={handleShareStoryClick}
              className="bg-global-9 text-global-1 px-[24px] sm:px-[28px] md:px-[34px] py-[12px] sm:py-[14px] md:py-[16px] rounded-[8px] text-[16px] font-semibold leading-[24px] hover:bg-opacity-90 transition-all duration-200"
            >
              {heroPick('share_button', 'shareYourStoryBtn')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimoniesPage;
