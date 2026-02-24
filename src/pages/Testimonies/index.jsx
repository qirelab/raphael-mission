import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTestimoniesContext } from '../../context/TestimoniesContext';
import Footer from '../../components/common/Footer';
import { TestimonialsGridSkeleton, HeroSkeleton } from '../../components/skeletons';

const TestimoniesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { testimonies: testimoniesRaw, loading } = useTestimoniesContext();

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
      <section className="relative isolate w-full overflow-hidden">
        <img
          src="/images/transformation.png"
          alt=""
          className="
            absolute inset-0 h-full w-full object-cover
            object-[60%_54%] sm:object-[60%_62%] md:object-[60%_70%] lg:object-[60%_78%] xl:object-[60%_82%]
            scale-[1.08] md:scale-[1.12] lg:scale-[1.14]
            brightness-[0.96] contrast-[0.86] saturate-[0.9]
          "
        />
        <div className="absolute inset-0 z-[1] bg-white/82 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-[2] bg-[#1F7A5B]/20 mix-blend-multiply" />

        <div className="relative z-[4] w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-[96px] sm:py-[136px] md:py-[170px] text-left">
            <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-[1.08] tracking-tight mb-4 lg:whitespace-nowrap">
              <span className="text-neutral-900">{t('testimoniesPageTitle')}</span>
              <span className="text-[#1F7A5B]"> {t('testimoniesPageTitleHighlight')}</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[26px] sm:leading-[28px] md:leading-[30px] text-[#111827]/80 max-w-[740px]">
              {t('testimoniesPageDescription')}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-48 z-[3] bg-gradient-to-t from-white/75 to-transparent" />
      </section>

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
              {t('shareYourStoryTitle')}
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[26px] sm:leading-[29px] md:leading-[33px] text-global-7 mb-[20px] sm:mb-[22px] md:py-[24px] max-w-4xl mx-auto">
              {t('shareYourStoryDesc')}
            </p>
            <Button
              variant="secondary"
              onClick={handleShareStoryClick}
              className="bg-global-9 text-global-1 px-[24px] sm:px-[28px] md:px-[34px] py-[12px] sm:py-[14px] md:py-[16px] rounded-[8px] text-[16px] font-semibold leading-[24px] hover:bg-opacity-90 transition-all duration-200"
            >
              {t('shareYourStoryBtn')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimoniesPage;
