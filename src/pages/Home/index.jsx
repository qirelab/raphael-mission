import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import TextArea from '../../components/ui/TextArea';
import { useLanguage } from '../../context/LanguageContext';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log({ firstName, lastName, email, subject, message });
  };

  return (
    <div className="w-full bg-[#ffffff]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-[#ffffff] relative overflow-hidden" style={{ position: 'relative' }}>
        <div className="hero-bg-blur" />
        <div className="hero-bg-overlay" />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,34,45,0.18)', zIndex: 2 }} />
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 4 }}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 py-8 sm:py-12 lg:py-16">
            {/* Logo */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <img
                src="/images/img_logo_2.png"
                alt={`${t('brandName')} Logo`}
                className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[386px] lg:h-[384px] transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:w-[64%] flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[40px] sm:leading-[50px] lg:leading-[60px] text-white font-['Poppins'] mb-4">
                <span className="text-white">{t('heroTitle')} </span>
                <span className="text-[#3b8a79]">{t('heroTitleHighlight')}</span>
              </h1>

              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[26px] sm:leading-[30px] lg:leading-[33px] text-white font-['Poppins'] mb-8 lg:mb-9">
                {t('heroDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  variant="primary"
                  className="pt-[18px] pr-[28px] pb-[18px] pl-[28px] text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[27px] text-center text-white font-['Poppins'] w-full sm:w-auto"
                  onClick={() => navigate('/donate')}
                >
                  {t('supportMission')}
                </Button>

                <Button
                  variant="outline"
                  className="pt-[18px] pr-[30px] pb-[18px] pl-[30px] text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[27px] text-center text-white font-['Poppins'] border-2 border-[#3b8a79] w-full sm:w-auto"
                  onClick={() => navigate('/about-mission')}
                >
                  {t('learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="w-full bg-[#e5e7eb] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-[#1f2937] font-['Poppins'] mb-3">
              {t('missionTitle')}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#374151] font-['Poppins'] max-w-[56%]">
              {t('missionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[44px]">
            {/* Card 1 */}
            <div className="bg-[#3c8a7a] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex-1 flex flex-col items-center text-center">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-white font-['Poppins'] mb-3">
                  {t('humanitarianAid')}
                </h3>
                <p className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sans']">
                  {t('humanitarianAidDesc')}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#3c8a7a] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex-1 flex flex-col items-center text-center">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-white font-['Poppins'] mb-3">
                  {t('spiritualGuidance')}
                </h3>
                <p className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sans']">
                  {t('spiritualGuidanceDesc')}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#3c8a7a] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex-1 flex flex-col items-center text-center">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-white font-['Poppins'] mb-3">
                  {t('communityBuilding')}
                </h3>
                <p className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sans']">
                  {t('communityBuildingDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="w-full bg-[#ffffff] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-[#1f2937] font-['Poppins'] mb-3">
              {t('currentProjects')}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#4b5563] font-['Poppins'] max-w-[60%]">
              {t('currentProjectsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[42px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group bg-[#f9fafb] rounded-[12px] shadow-[0px_10px_15px_#00000019] overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* image with hover overlay */}
                <div className="relative w-full h-[160px] sm:h-[180px] lg:h-[192px] overflow-hidden">
                  <img
                    src="/images/img_img.png"
                    alt="project"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/25 flex items-center justify-center">
                    <a href="/projects" className="text-white text-[14px] sm:text-[16px] font-semibold underline">
                      {t('learnMore')}
                    </a>
                  </div>
                </div>

                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                      {t('cleanWaterInitiative')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#4b5563] font-['Poppins']">
                      {t('impact25')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-4">
                    <a href="/projects" className="flex items-center gap-2 text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#3c8a7a] font-['Poppins'] hover:underline">
                      {t('learnMore')}
                      <img src="/images/img_frame.svg" alt="arrow" className="w-[14px] h-[16px]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Mission */}
      <section className="w-full bg-[#3c8a7a] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-white font-['Poppins'] mb-6">
              {t('supportOurMission')}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-white/90 font-['Poppins'] max-w-[62%] mx-auto mb-12">
              {t('supportMissionDesc')}
            </p>

            <div className="w-full flex flex-wrap gap-6 justify-center">
              <button
                className="bg-white text-[#0070BA] font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                onClick={() => navigate('/donation?method=paypal')}
              >
                <img src="/images/payp.svg" alt="PayPal" className="w-[12px] h-[24px] transition-transform duration-300 hover:scale-110" />
                PayPal
              </button>
              <button
                className="bg-white text-[#8454ec] font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                onClick={() => navigate('/donation?method=stripe')}
              >
                <img src="/images/stripe1.svg" alt="Stripe" className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110" />
                Stripe
              </button>
              <button
                className="bg-white text-[#EB5B0E] font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                onClick={() => navigate('/donation?method=fondy')}
              >
                <img src="/images/fondy.svg" alt="Fondy" className="w-[22px] h-[24px] transition-transform duration-300 hover:scale-110" />
                Fondy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonies */}
      <section id="testimonies" className="w-full bg-white py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[36px] sm:leading-[42px] lg:leading-[48px] text-[#111827] font-['Poppins'] mb-4">
              {t('testimonies')}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[24px] sm:leading-[28px] lg:leading-[30px] text-[#4b5563] font-['Poppins'] max-w-[44%]">
              {t('testimoniesDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[42px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group bg-white rounded-[16px] p-6 lg:p-7 shadow-[0px_10px_15px_#00000019] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[26px] text-[#374151] font-['Poppins'] mb-16 lg:mb-[74px]">
                  {t('quoteSarahJohnson')}
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src="/images/img_ellipse_1.png"
                    alt={t('sarahJohnson')}
                    className="w-[52px] h-[52px] rounded-[26px] transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[16px] lg:text-[18px] font-semibold leading-[24px] lg:leading-[27px] text-[#111827] font-['Poppins']">
                        {t('sarahJohnson')}
                      </h4>
                      <img src="/images/img_vector.svg" alt="quote" className="w-[12px] h-[18px]" />
                    </div>
                    <p className="text-[12px] lg:text-[14px] font-normal leading-[18px] lg:leading-[21px] text-[#6b7280] font-['Poppins']">
                      {t('torontoCanada')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full bg-[#3c8a7a] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Info */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-white font-['Poppins'] mb-3">
                {t('contactUsTitle')}
              </h2>
              <p className="max-w-[82%] mb-8 text-[16px] sm:text-[18px] lg:text-[20px] leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#dcfce7] font-['Poppins']">
                {t('contactUsDesc')}
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <img src="/images/img_div_blue_gray_600.svg" alt={t('addressLabel')} className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins']">
                      {t('addressLabel')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {t('addressLine')}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <img src="/images/img_div_blue_gray_600_48x48.svg" alt={t('phoneLabel')} className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins']">
                      {t('phoneLabel')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {t('phoneNumber')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <img src="/images/img_vector_blue_gray_600.svg" alt={t('emailLabel')} className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins']">
                      {t('emailLabel')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {t('emailAddress')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-[46%] bg-white rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019]">
              <h3 className="text-[20px] lg:text-[24px] font-semibold leading-[30px] lg:leading-[36px] text-[#1f2937] font-['Poppins'] mb-4">
                {t('sendMessage')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <EditText
                    placeholder={t('firstName')}
                    value={firstName}
                    onChange={(e) => setFirstName(e?.target?.value)}
                    fullWidth
                  />
                  <EditText
                    placeholder={t('lastName')}
                    value={lastName}
                    onChange={(e) => setLastName(e?.target?.value)}
                    fullWidth
                  />
                </div>

                <EditText
                  placeholder={t('emailField')}
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  fullWidth
                />

                <EditText
                  placeholder={t('subject')}
                  value={subject}
                  onChange={(e) => setSubject(e?.target?.value)}
                  fullWidth
                />

                <TextArea
                  placeholder={t('yourMessage')}
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  rows={6}
                  fullWidth
                />

                <div className="flex justify-center">
                  <button type="submit" className="bg-[#3c8a7a] rounded-[8px] px-4 py-2 w-full flex justify-center">
                    <span className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-center text-white font-['Poppins'] py-1.5">
                      {t('sendMessage')}
                    </span>
                  </button>
                </div>
              </form>
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
                <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px]" />
                <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px]" />
                <img src="/images/youtube.svg" alt="Youtube" className="w-[18px] h-[16px]" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Navigation */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  <a href="http://localhost:4028/about-mission" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('about')}</a>
                  <a href="http://localhost:4028/projects" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('projects')}</a>
                  <a href="http://localhost:4028/testimonies" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('testimonies')}</a>
                  <a href="http://localhost:4028/training" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('training')}</a>
                  <a href="http://localhost:4028/story" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('story')}</a>
                  <a href="http://localhost:4028/shop" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('shop')}</a>
                  <a href="http://localhost:4028/questions-contact" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('contact')}</a>
                  <a href="http://localhost:4028/donation" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('donate')}</a>
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

export default Home;
