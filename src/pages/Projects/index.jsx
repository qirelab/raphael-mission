import React from 'react';
import Header from '../../components/common/Header';
import { useLanguage } from '../../context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-[#ffffff]">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-[#ffffff] relative overflow-hidden" style={{position: 'relative'}}>
        <div className="hero-bg-blur"></div>
        <div className="hero-bg-overlay"></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(30,34,45,0.18)',
            zIndex: 2,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.6)',
            opacity: 1,
            zIndex: 3,
          }}
        ></div>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8" style={{position: 'relative', zIndex: 4}}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 py-8 sm:py-12 lg:py-16">
            {/* Hero Content */}
            <div className="w-full lg:w-[64%] flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[40px] sm:leading-[50px] lg:leading-[60px] text-[#1f2937] font-['Poppins'] mb-4">
                <span className="text-[#1f2937]">Мы приносим надежду через </span>
                <span className="text-[#3b8a79]">веру, сострадание и служение</span>
              </h1>
              
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[26px] sm:leading-[30px] lg:leading-[33px] text-[#4b5563] font-['Poppins'] mb-8 lg:mb-9 max-w-full">
                Мы верим, что настоящие перемены происходят, когда практическая помощь и духовная надежда объединяются. Через акты сострадания мы доставляем еду, медицинскую помощь и необходимые ресурсы нуждающимся сообществам, а также делимся посланием веры, которое приносит силу и обновление.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-[#3c8a7a] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-[16px] sm:text-[18px] font-['Poppins'] w-full sm:w-auto">
                  Принять участие →
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/images/praying-man.jpg" 
                  alt="Семья с ребенком" 
                  className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[386px] lg:h-[384px] rounded-lg object-cover" 
                />
                {/* Stats Card */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#3c8a7a] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[14px] font-semibold text-[#1f2937] font-['Poppins']">
                      50+ Сообществ Обслужено
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Do This Section */}
      <section className="w-full bg-[#3c8a7a] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-[#ffffff] font-['Poppins'] mb-3">
              Почему мы это делаем?
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#dcfce7] font-['Poppins'] max-w-[56%]">
              Мы призваны служить человечеству с состраданием, принося надежду и исцеление сообществам по всему миру через инициативы, основанные на вере.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[44px]">
            {/* Card 1 */}
            <div className="bg-[#4ade80] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                Наше призвание
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#dcfce7] font-['Open_Sans']">
                Служить Богу и людям с любовью и преданностью
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#60a5fa] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                Наше призвание
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#dbeafe] font-['Open_Sans']">
                Служить Богу и людям с любовью и преданностью
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#a78bfa] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                Наше призвание
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#ede9fe] font-['Open_Sans']">
                Служить Богу и людям с любовью и преданностью
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#fb923c] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                Наше призвание
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#fed7aa] font-['Open_Sans']">
                Служить Богу и людям с любовью и преданностью
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="w-full bg-[#ffffff] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-[#1f2937] font-['Poppins'] mb-3">
              Наши основные цели
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#374151] font-['Poppins'] max-w-[56%]">
              Мы стремимся к тому, чтобы каждый человек мог испытать Божью любовь и найти надежду в своей жизни.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[44px]">
            {/* Faith */}
            <div className="bg-[#ffffff] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3c8a7a] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                Вера
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#6b7280] font-['Open_Sans']">
                Укрепляем духовную основу через проповедь Евангелия и молитвенную поддержку
              </p>
            </div>

            {/* Compassion */}
            <div className="bg-[#ffffff] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3c8a7a] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                Сострадание
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#6b7280] font-['Open_Sans']">
                Проявляем Божью любовь через практическую помощь и заботу о нуждающихся
              </p>
            </div>

            {/* Service */}
            <div className="bg-[#ffffff] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#3c8a7a] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                Служение
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#6b7280] font-['Open_Sans']">
                Служим сообществам, строя долгосрочные отношения и поддерживая местные церкви
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#333333] py-8 lg:py-10">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
            {/* Brand Section */}
            <div className="w-full lg:w-[22%]">
              <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-[#ffffff] font-['Poppins'] mb-4">
                Raphael Mission
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] mb-6 max-w-[94%]">
                {t('footerDesc')}
              </p>
              <div className="flex items-center gap-3">
                <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px]" />
                <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px]" />
                <img src="/images/img_frame_blue_gray_100_16x18.svg" alt="Instagram" className="w-[18px] h-[16px]" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Navigation */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-[#ffffff] font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      {t('about')}
                    </span>
                    <img src="/images/img_arrow_down_white_a700.svg" alt="dropdown" className="w-[10px] h-[6px]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      {t('projects')}
                    </span>
                    <img src="/images/img_arrow_down_white_a700.svg" alt="dropdown" className="w-[10px] h-[6px]" />
                  </div>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('fund')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('testimonies')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('training')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('story')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('shop')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('contact')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('donate')}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="w-full lg:w-[48%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-[#ffffff] font-['Poppins'] mb-4">
                  {t('contact')}
                </h4>
                <div className="space-y-2 max-w-[84%]">
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('phoneValue')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('emailValue')}
                  </p>
                  <div>
                    <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      {t('addressValue')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal */}
              <div className="w-full lg:w-[42%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-[#ffffff] font-['Poppins'] mb-4">
                  {t('legal')}
                </h4>
                <div className="space-y-2">
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('privacyPolicy')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('termsOfService')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('cookiePolicy')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-gray-600">
            <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;

