// src/pages/QuestionsContact/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import { useLanguage } from '../../context/LanguageContext';

const QuestionsContact = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-[#F6F7F9]">
      {/* HEADER */}
      <Header />

      <main>
        {/* WAYS TO CONNECT — по центру экрана */}
        <section className="w-full bg-[#F6F7F9]">
          <div className="max-w-[1292px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Вертикальное центрирование блока */}
            <div className="min-h-[60vh] flex flex-col justify-center">
              <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] font-[Poppins] font-normal text-center text-[#1F7A5B]">
                {t('waysToConnectTitle')}
              </h2>

              <div
                className="
                  mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8
                  place-items-center
                  max-w-[1100px] mx-auto
                "
              >
                {/* Call Us */}
                <div
                  className="
                    group w-full max-w-[350px] rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF]
                    p-6 sm:p-8 text-center cursor-default
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(59,130,246,0.15)]
                    hover:border-[#CFE3FF] hover:bg-[#EAF2FF]
                    focus-within:ring-2 focus-within:ring-[#90C2FF]
                  "
                >
                  <div
                    className="
                      mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DFEAFF]
                      flex items-center justify-center
                      transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D3E4FF]
                    "
                  >
                    <img
                      src="/images/callus.png"
                      alt="Phone icon"
                      className="w-15 h-15 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">
                    {t('callUs')}
                  </h3>
                  <p className="mt-2 text-[16px] sm:text-[18px] font-[Poppins] text-[#334155]">
                    {t('phoneNumber')}
                  </p>
                  <p className="mt-1 text-[13px] sm:text-[14px] font-[Poppins] text-[#64748b]">
                    {t('phoneWorkHoursShort')}
                  </p>
                </div>

                {/* Address */}
                <div
                  className="
                    group w-full max-w-[350px] rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF]
                    p-6 sm:p-8 text-center cursor-default
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(59,130,246,0.15)]
                    hover:border-[#CFE3FF] hover:bg-[#EAF2FF]
                    focus-within:ring-2 focus-within:ring-[#90C2FF]
                  "
                >
                  <div
                    className="
                      mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DFEAFF]
                      flex items-center justify-center
                      transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D3E4FF]
                    "
                  >
                    <img
                      src="/images/div.svg"
                      alt="Address icon"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">
                    {t('address')}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                    {t('addressLine')}
                  </p>
                </div>

                {/* Email Us */}
                <div
                  className="
                    group w-full max-w-[350px] rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF]
                    p-6 sm:p-8 text-center cursor-default
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(59,130,246,0.15)]
                    hover:border-[#CFE3FF] hover:bg-[#EAF2FF]
                    focus-within:ring-2 focus-within:ring-[#90C2FF]
                  "
                >
                  <div
                    className="
                      mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DFEAFF]
                      flex items-center justify-center
                      transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D3E4FF]
                    "
                  >
                    <img
                      src="/images/emailas.png"
                      alt="Email icon"
                      className="w-15 h-15 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">
                    {t('emailUs')}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                    {t('emailAddress')}
                  </p>
                  <p className="mt-1 text-[12px] sm:text-[14px] font-[Poppins] text-[#64748b]">
                    {t('weRespondSoon')}
                  </p>
                </div>
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
                  {t('brandName')}
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
                    <a href="http://localhost:4028/about-mission" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('about')}</a>
                    <a href="http://localhost:4028/projects" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('projects')}</a>
                    <a href="http://localhost:4028/testimonies" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('testimonies')}</a>
                    <a href="http://localhost:4028/training" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('training')}</a>
                    <a href="http://localhost:4028/story" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('story')}</a>
                    <a href="http://localhost:4028/shop" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('shop')}</a>
                    <a href="http://localhost:4028/questions-contact" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('contact')}</a>
                    <a href="http://localhost:4028/donation" className="block text-[14px] lg:text-[16px] text-[#d1d5db] font-['Poppins']">{t('donate')}</a>
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

            <div className="text-center pt-6 border-t border-gray-600">
              <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                {t('copyright')}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default QuestionsContact;
