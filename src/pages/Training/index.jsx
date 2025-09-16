import React from 'react';
import Header from '../../components/common/Header';
import { useLanguage } from '../../context/LanguageContext';

const TrainingPrograms = () => {
  const { t } = useLanguage();

  const trainingPrograms = [
    {
      id: 1,
      title: t('trainingEvangelismEssentials'),
      description: t('trainingEvangelismEssentialsDesc'),
      duration: t('trainingEvangelismEssentialsDuration'),
      image: '/images/evangelizm.png',
    },
    {
      id: 2,
      title: t('trainingCommunityServiceLeadership'),
      description: t('trainingCommunityServiceLeadershipDesc'),
      duration: t('trainingCommunityServiceLeadershipDuration'),
      image: '/images/img_img_1.png',
    },
    {
      id: 3,
      title: t('trainingPrayerHealingMinistry'),
      description: t('trainingPrayerHealingMinistryDesc'),
      duration: t('trainingPrayerHealingMinistryDuration'),
      image: '/images/img_img_2.png',
    },
    {
      id: 4,
      title: t('trainingCreativeArtsMinistry'),
      description: t('trainingCreativeArtsMinistryDesc'),
      duration: t('trainingCreativeArtsMinistryDuration'),
      image: '/images/img_img_3.png',
    },
    {
      id: 5,
      title: t('trainingChurchSupportDevelopment'),
      description: t('trainingChurchSupportDevelopmentDesc'),
      duration: t('trainingChurchSupportDevelopmentDuration'),
      image: '/images/img_img_4.png',
    },
  ];

  const testimonials = [
    
  ];

  return (
    <div className="w-full bg-white">
      <Header />

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
            <p className="text-black text-[14px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[26px] lg:leading-[28px] max-w-none">
              {t('trainingHeroDescription')}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-[12px] border border-[#eef0f3] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
              >
                <img src={p.image} alt={p.title} className="w-full h-[170px] object-cover" />
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-[#0f172a] font-semibold font-[Poppins] text-[16px] sm:text-[18px] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[#6b7280] text-[13px] sm:text-[14px] leading-[20px] mb-4">{p.description}</p>
                  <p className="text-[#3c8a7a] font-medium text-[12px]">{p.duration}</p>
                </div>
              </div>
            ))}
          </div>
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
              {t('trainingStatsDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-[12px] border border-[#eef0f3] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-[#0f172a] font-semibold">{t.name}</p>
                    <p className="text-[#6b7280] text-[13px]">{t.role}</p>
                  </div>
                </div>
                <p className="text-[#6b7280] text-[14px] leading-[22px]">&quot;{t.text}&quot;</p>
              </div>
            ))}
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
              {t('trainingCtaDescription')}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center rounded-md border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white/10">
                {t('trainingContactButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#333333] py-8 lg:py-10">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="w-full lg:w-[22%]">
              <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-white font-['Poppins'] mb-4">
                Raphael Mission
              </h3>
              <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] mb-6 max-w-[94%]">
                {t('footerDesc')}
              </p>
              <div className="flex items-center gap-3">
                <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px]" />
                <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px]" />
                <img src="/images/youtube.svg" alt="Instagram" className="w-[18px] h-[16px]" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Navigation */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  {['About', 'Projects', 'Fund', 'Testimonies', 'Training', 'Story', 'Shop', 'Contact', 'Donate'].map(
                    (item) => (
                      <p
                        key={item}
                        className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']"
                      >
                        {item}
                      </p>
                    ),
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="w-full lg:w-[48%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('contact')}
                </h4>
                <div className="space-y-2 max-w-[84%]">
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    info@raphaelmission.org
                  </p>
                  <div>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      123 Mission Street
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
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('privacyPolicy')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('termsOfService')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('cookiePolicy')}
                  </p>
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
