import React from 'react';
import Header from '../../components/common/Header';
import '../../styles/shop.css';
import { useLanguage } from '../../context/LanguageContext';

const Shop = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      name: 'Handcrafted Prayer',
      description:
        'Beautiful wooden cross made by local artisans in our partner communities.',
      price: '$35',
      // ✅ как просили
      image: '/images/shop/img_img_192x280.png',
    },
    {
      id: 2,
      name: 'Faith & Purpose Journal',
      description:
        'Daily reflections and guided prayers for spiritual growth and mindfulness.',
      price: '$24',
      image: '/images/bible.png',
    },
    {
      id: 3,
      name: 'Mission T-Shirt',
      description:
        'Comfortable organic cotton tee featuring our mission logo and values.',
      price: '$28',

      image: '/images/t.shurt.png',
    },
    {
      id: 4,
      name: 'Clean Water Bottle',
      description:
        'Eco-friendly bottle supporting our clean water initiatives worldwide.',
      price: '$32',
      // ✅ как просили
      image: '/images/shop/img_img_8.png',
    },
  ];

  const impactAreas = [
    {
      icon: '/images/cleanwater.png',
      title: 'Clean Water Access',
      description:
        '25% of proceeds fund water wells and purification systems in underserved communities.',
    },
    {
      icon: '/images/human.png',
      title: 'Humanitarian Aid',
      description:
        '35% supports emergency relief, food programs, and medical assistance worldwide.',
    },
    {
      icon: '/images/community.png',
      title: 'Community Building',
      description:
        '40% funds education programs, spiritual guidance, and local development projects.',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Community Leader, Guatemala',
      image: '/images/saramit.png',
      testimonial:
        'Thanks to the water bottle sales, our village now has clean drinking water for the first time. My children no longer get sick from contaminated water. This mission truly cares about our wellbeing.',
    },
    {
      name: 'David Chen',
      role: 'Customer & Supporter',
      image: '/images/davidch.png',
      testimonial:
        'I bought the prayer journal and it has transformed my daily spiritual practice. Knowing that my purchase also helps fund humanitarian projects makes it even more meaningful.',
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
              Support Our Mission Through Your
              <br className="hidden sm:block" /> Purchase
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-poppins font-normal leading-[26px] sm:leading-[30px] lg:leading-[33px] text-[#6b7280] max-w-[760px]">
              Every purchase you make helps fund our humanitarian aid programs,
              spiritual guidance initiatives, and community building projects
              around the world
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
        <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eef0f3] overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-[190px] object-cover"
                />
                <div className="p-5">
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
                Raphael Mission
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
                  {['About','Projects','Fund','Testimonies','Training','Story','Shop','Contact','Donate'].map(x=>(
                    <p key={x} className="text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{x}</p>
                  ))}
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


