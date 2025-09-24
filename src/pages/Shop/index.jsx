import React from 'react';
import Header from '../../components/common/Header';
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
      <Header />

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
                className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eef0f3] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-xl"
              >
                <img
                  src={p.image}
                  alt={idx === 0 ? t('shopProductPrayerTitle') : p.name}
                  className="w-full h-[190px] object-cover"
                />
                <div className="p-5">
                  {idx === 0 ? (
                    <>
                      <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                        {t('shopProductPrayerTitle')}
                      </h3>
                      <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4">
                        {t('shopProductPrayerDesc')}
                      </p>
                      <div className="flex items-center justify-between">
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
                      <div className="flex items-center justify-between">
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
                      <div className="flex items-center justify-between">
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
                      <div className="flex items-center justify-between">
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
                      <div className="flex items-center justify-between">
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

      {/* FOOTER */}
      <footer className="w-full bg-[#333333] py-8 lg:py-10">
        <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="w-full lg:w-[28%]">
              <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-white font-['Poppins'] mb-4">
                {t('brandName')}
              </h3>
              <p className="text-[14px] lg:text-[16px] leading-[22px] text-[#d1d5db] font-['Poppins'] mb-6">
                {t('footerDesc')}
              </p>
              <div className="flex items-center gap-3">
                <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px]" />
                <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px]" />
                <img src="/images/youtube.svg" alt="Instagram" className="w-[18px] h-[16px]" />
              </div>
            </div>

            {/* Columns */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Nav */}
              <div>
                <h4 className="text-[14px] lg:text-[16px] font-semibold text-white font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  <a href="http://localhost:4028/about-mission" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('about')}</a>
                  <a href="http://localhost:4028/projects" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('projects')}</a>
                  <a href="http://localhost:4028/fund" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('fund')}</a>
                  <a href="http://localhost:4028/testimonies" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('testimonies')}</a>
                  <a href="http://localhost:4028/training" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('training')}</a>
                  <a href="http://localhost:4028/story" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('story')}</a>
                  <a href="http://localhost:4028/shop" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('shop')}</a>
                  <a href="http://localhost:4028/questions-contact" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('contact')}</a>
                  <a href="http://localhost:4028/donation" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('donate')}</a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-[14px] lg:text-[16px] font-semibold text-white font-['Poppins'] mb-4">
                  {t('contact')}
                </h4>
                <div className="space-y-2">
                  <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">+1 (555) 123-4567</p>
                  <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">info@raphaelmission.org</p>
                  <div>
                    <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">123 Mission Street</p>
                    <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">Faith City, FC 12345</p>
                  </div>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[14px] lg:text-[16px] font-semibold text-white font-['Poppins'] mb-4">
                  {t('legal')}
                </h4>
                <div className="space-y-2">
                  <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('privacyPolicy')}</p>
                  <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('termsOfService')}</p>
                  <p className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('cookiePolicy')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-gray-600">
            <p className="text-[13px] lg:text-[14px] text-[#d1d5db] font-['Poppins']">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
