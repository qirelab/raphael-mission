import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { trainingService } from '../../services/trainingService';
import Footer from '../../components/common/Footer';
import { TrainingGridSkeleton, HeroSkeleton } from '../../components/skeletons';

const TrainingPrograms = () => {
  const { t, language } = useLanguage();
  const [trainingProgramsData, setTrainingProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load training programs only once, not on language change
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const data = await trainingService.getActive();
        setTrainingProgramsData(data);
      } catch (error) {
        console.error('Error loading training programs:', error);
        setTrainingProgramsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []); // Load only once!

  // Transform programs based on current language (client-side, no API call)
  const trainingPrograms = trainingProgramsData.map((p) => ({
    ...p,
    title: p[`title_${language}`] || p.title_en,
    description: p[`description_${language}`] || p.description_en,
    duration: p[`duration_${language}`] || p.duration_en || '',
  }));

  if (loading) {
    return (
      <div className="w-full bg-white">
        {/* HERO SKELETON */}
        <section className="relative w-full">
          <div className="absolute inset-0 bg-gray-200" />
          <div className="relative z-10 max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] flex flex-col justify-center">
              <HeroSkeleton />
            </div>
          </div>
        </section>

        {/* PROGRAMS SKELETON */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="animate-pulse bg-gray-200 rounded h-10 w-64 mx-auto mb-4"></div>
              <div className="animate-pulse bg-gray-200 rounded h-6 w-96 mx-auto"></div>
            </div>
            <TrainingGridSkeleton count={6} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
            <CardsGridSkeleton count={6} showImages={true} showButtons={false} />
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
                      {p[`duration_${language}`] ||
                        p.duration_en ||
                        t('contactForDuration') ||
                        'Contact for details'}
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
              <a href={`/${language}/contact`}>
                <button className="inline-flex items-center justify-center rounded-md border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  {t('trainingCtaButton')}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainingPrograms;
