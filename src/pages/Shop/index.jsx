import React from 'react';
import '../../styles/shop.css';
import { useLanguage } from '../../context/LanguageContext';

const Shop = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      image: '/images/shop/img_img_192x280.png',
    },
    {
      id: 2,
      name: t('shopProductJournalTitle'),
      description: t('shopProductJournalDesc'),
      price: t('shopProductJournalPrice'),
      image: '/images/bible.png',
    },
    {
      id: 3,
      name: t('shopProductTshirtTitle'),
      description: t('shopProductTshirtDesc'),
      price: t('shopProductTshirtPrice'),
      image: '/images/shurt.png', // фикс опечатки
    },
    {
      id: 4,
      name: t('shopProductBottleTitle'),
      description: t('shopProductBottleDesc'),
      price: t('shopProductBottlePrice'),
      image: '/images/shop/img_img_8.png',
    },
  ];

  const testimonials = [
    {
      name: t('shopTestimonialMariaName'),
      role: t('shopTestimonialMariaRole'),
      image: '/images/saramit.png',
      testimonial: t('shopTestimonialMariaText'),
    },
    {
      name: t('shopTestimonialDavidName'),
      role: t('shopTestimonialDavidRole'),
      image: '/images/davidch.png',
      testimonial: t('shopTestimonialDavidText'),
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="w-full bg-[linear-gradient(90deg,#f8f6f3_0%,_#ffffff_100%)]">
        <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col items-center text-center gap-4 sm:gap-5">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-poppins font-bold leading-tight text-[#275a3a]">
              {t('shopHeroTitle')}
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-poppins font-normal leading-[26px] sm:leading-[30px] lg:leading-[33px] text-[#6b7280] max-w-[760px]">
              {t('shopHeroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
        <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {products.map((p, idx) => (
              <div
                key={p.id}
                className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eef0f3] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-xl flex flex-col h-full"
              >
                <img
                  src={p.image}
                  alt={idx === 0 ? t('shopProductPrayerTitle') : p.name}
                  className="w-full h-[190px] object-cover"
                />
                <div className="p-5 flex flex-col h-full">
                  {idx === 0 ? (
                    <>
                      <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                        {t('shopProductPrayerTitle')}
                      </h3>
                      <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4">
                        {t('shopProductPrayerDesc')}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[18px] lg:text-[20px] font-poppins font-bold text-[#0f172a]">
                          {t('shopProductPrayerPrice')}
                        </span>
                      </div>
                    </>
                  ) : idx === 1 ? (
                    <>
                      <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                        {t('shopProductJournalTitle')}
                      </h3>
                      <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4">
                        {t('shopProductJournalDesc')}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[18px] lg:text-[20px] font-poppins font-bold text-[#0f172a]">
                          {t('shopProductJournalPrice')}
                        </span>
                      </div>
                    </>
                  ) : idx === 2 ? (
                    <>
                      <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                        {t('shopProductTshirtTitle')}
                      </h3>
                      <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4">
                        {t('shopProductTshirtDesc')}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[18px] lg:text-[20px] font-poppins font-bold text-[#0f172a]">
                          {t('shopProductTshirtPrice')}
                        </span>
                      </div>
                    </>
                  ) : idx === 3 ? (
                    <>
                      <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                        {t('shopProductBottleTitle')}
                      </h3>
                      <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4">
                        {t('shopProductBottleDesc')}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[18px] lg:text-[20px] font-poppins font-bold text-[#0f172a]">
                          {t('shopProductBottlePrice')}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                        {p.name}
                      </h3>
                      <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4">
                        {p.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[18px] lg:text-[20px] font-poppins font-bold text-[#0f172a]">
                          {p.price}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
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
                <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px] transition-transform duration-200 hover:scale-110" />
                <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px] transition-transform duration-200 hover:scale-110" />
                <img src="/images/youtube.svg" alt="Youtube" className="w-[18px] h-[16px] transition-transform duration-200 hover:scale-110" />
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
                    { href: '#', label: t('privacyPolicy') },
                    { href: '#', label: t('termsOfService') },
                    { href: '#', label: t('cookiePolicy') },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="relative block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] transition-colors hover:text-white
                                 after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                    >
                      {l.label}
                    </a>
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

export default Shop;
