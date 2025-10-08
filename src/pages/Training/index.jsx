import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { trainingService } from '../../services/trainingService';

const TrainingPrograms = () => {
  const { t, language } = useLanguage();
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const data = await trainingService.getActive();
        setTrainingPrograms(data);
      } catch (error) {
        console.error('Error loading training programs:', error);
        setTrainingPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="relative w-full">
        <div className="absolute inset-0">
          <img
            src="/images/img_img.png"
            alt="Training"
            className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="relative z-10 max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] flex flex-col justify-center">
            <h1 className="text-black font-bold font-[Poppins] text-[28px] sm:text-[40px] lg:text-[56px] leading-tight mb-3">
              {t('trainingHeroTitle')}
            </h1>
            <p className="text-black text-[14px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[26px] lg:leading-[28px]">
              {t('trainingHeroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-[#0f172a] font-bold font-[Poppins] text-[24px] sm:text-[28px] lg:text-[32px]">
              {t('trainingProgramsTitle')}
            </h2>
            <p className="mt-2 text-[#6b7280] text-[14px] sm:text-[16px] max-w-[760px] mx-auto">
              {t('trainingProgramsDescription')}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[12px] shadow-sm animate-pulse overflow-hidden"
                >
                  <div className="w-full h-[170px] bg-gray-300"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : trainingPrograms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingPrograms.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-[12px] border border-[#eef0f3] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={p.image_url || '/images/evangelizm.png'}
                    alt={p[`title_${language}`] || p.title_en}
                    className="w-full h-[170px] object-cover"
                  />
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-[#0f172a] font-semibold font-[Poppins] text-[16px] sm:text-[18px] mb-2">
                      {p[`title_${language}`] || p.title_en}
                    </h3>
                    <p className="text-[#6b7280] text-[13px] sm:text-[14px] leading-[20px] mb-4 line-clamp-3">
                      {p[`description_${language}`] || p.description_en}
                    </p>
                    <p className="text-[#3c8a7a] font-medium text-[12px] mt-auto">
                      {p.duration
                        ? `${p.duration} ${t('weeks') || 'weeks'}`
                        : t('contactForDuration') || 'Contact for details'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 font-poppins">
              {t('noTrainingPrograms') ||
                'No training programs available. Add some in the admin panel!'}
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#d7f6e6] py-12">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-[#3c8a7a] font-bold font-[Poppins] text-[44px] sm:text-[56px] lg:text-[64px] leading-none">
              2,500+
            </h2>
            <h3 className="mt-2 text-[#0f172a] font-semibold text-[18px] sm:text-[20px]">
              {t('trainingStatsTitle')}
            </h3>
            <p className="mt-3 text-[#6b7280] text-[14px] sm:text-[16px] max-w-[900px] mx-auto">
              {t('trainingStatsDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-[#2f7154] py-12">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-white font-bold font-[Poppins] text-[22px] sm:text-[26px]">
              {t('trainingCtaTitle')}
            </h2>
            <p className="mt-2 text-white/90 text-[14px] sm:text-[16px] max-w-[820px] mx-auto">
              {t('trainingCtaDesc')}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/questions-contact">
                <button className="inline-flex items-center justify-center rounded-md border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white/10">
                  {t('trainingCtaButton')}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              {/* Navigation (с hover-эффектом) */}
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

export default TrainingPrograms;
