import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log({ firstName, lastName, email, subject, message });
  };

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
            {/* Logo Image */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <img 
                src="/images/img_logo_2.png" 
                alt="Raphael Mission Logo" 
                className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[386px] lg:h-[384px]" 
              />
            </div>

            {/* Hero Content */}
            <div className="w-full lg:w-[64%] flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[40px] sm:leading-[50px] lg:leading-[60px] text-[#1f2937] font-['Poppins'] mb-4">
                <span className="text-[#1f2937]">{t('heroTitle')} </span>
                <span className="text-[#3b8a79]">{t('heroTitleHighlight')}</span>
              </h1>
              
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[26px] sm:leading-[30px] lg:leading-[33px] text-[#4b5563] font-['Poppins'] mb-8 lg:mb-9 max-w-full">
                {t('heroDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  variant="primary"
                  className="pt-[18px] pr-[28px] pb-[18px] pl-[28px] text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[27px] text-center text-[#ffffff] font-['Poppins'] w-full sm:w-auto"
                >
                  {t('supportMission')}
                </Button>
                <Button 
                  variant="outline"
                  className="pt-[18px] pr-[30px] pb-[18px] pl-[30px] text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[27px] text-center text-[#3c8a7a] font-['Poppins'] border-2 border-[#3c8a7a] w-full sm:w-auto"
                >
                  {t('learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Mission Section */}
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
            {/* Humanitarian Aid */}
            <div className="bg-[#3c8a7a] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                {t('humanitarianAid')}
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sans']">
                {t('humanitarianAidDesc')}
              </p>
              {/* Кнопка: белая с тенью */}
              <button className="mt-4 bg-white text-[#3c8a7a] font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition">{t('learnMore')}</button>
              {/* Кнопка: зелёная (раскомментируй, если хочешь зелёную) */}
              {/* <button className="mt-4 bg-[#3c8a7a] text-white font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition">Learn More</button> */}
            </div>

            {/* Spiritual Guidance */}
            <div className="bg-[#3c8a7a] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                {t('spiritualGuidance')}
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sans']">
                {t('spiritualGuidanceDesc')}
              </p>
              {/* Кнопка: белая с тенью */}
              <button className="mt-4 bg-white text-[#3c8a7a] font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition">{t('learnMore')}</button>
              {/* Кнопка: зелёная (раскомментируй, если хочешь зелёную) */}
              {/* <button className="mt-4 bg-[#3c8a7a] text-white font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition">Learn More</button> */}
            </div>

            {/* Community Building */}
            <div className="bg-[#3c8a7a] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center text-center">
              <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#ffffff] font-['Poppins'] mb-3">
                {t('communityBuilding')}
              </h3>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sans']">
                {t('communityBuildingDesc')}
              </p>
              {/* Кнопка: белая с тенью */}
              <button className="mt-4 bg-white text-[#3c8a7a] font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition">{t('learnMore')}</button>
              {/* Кнопка: зелёная (раскомментируй, если хочешь зелёную) */}
              {/* <button className="mt-4 bg-[#3c8a7a] text-white font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition">Learn More</button> */}
            </div>
          </div>
        </div>
      </section>
      {/* Current Projects Section */}
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
            {/* Project 1 */}
            <div className="bg-[#f9fafb] rounded-[12px] shadow-[0px_10px_15px_#00000019] overflow-hidden">
              <img 
                src="/images/img_img.png" 
                alt={t('cleanWaterInitiative')} 
                className="w-full h-[160px] sm:h-[180px] lg:h-[192px] object-cover" 
              />
              <div className="p-5 lg:p-6">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                  {t('cleanWaterInitiative')}
                </h3>
                <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#4b5563] font-['Poppins'] mb-4">
                  {t('cleanWaterInitiativeDesc')}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#3c8a7a] font-['Poppins']">
                    {t('learnMore')}
                  </span>
                  <img src="/images/img_frame.svg" alt="arrow" className="w-[14px] h-[16px]" />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-[#f9fafb] rounded-[12px] shadow-[0px_10px_15px_#00000019] overflow-hidden">
              <img 
                src="/images/img_img.png" 
                alt={t('educationProgram')} 
                className="w-full h-[160px] sm:h-[180px] lg:h-[192px] object-cover" 
              />
              <div className="p-5 lg:p-6">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                  {t('educationProgram')}
                </h3>
                <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#4b5563] font-['Poppins'] mb-4">
                  {t('educationProgramDesc')}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#3c8a7a] font-['Poppins']">
                    {t('learnMore')}
                  </span>
                  <img src="/images/img_frame.svg" alt="arrow" className="w-[14px] h-[16px]" />
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-[#f9fafb] rounded-[12px] shadow-[0px_10px_15px_#00000019] overflow-hidden">
              <img 
                src="/images/img_img.png" 
                alt={t('healthcareOutreach')} 
                className="w-full h-[160px] sm:h-[180px] lg:h-[192px] object-cover" 
              />
              <div className="p-5 lg:p-6">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                  {t('healthcareOutreach')}
                </h3>
                <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#4b5563] font-['Poppins'] mb-4">
                  {t('healthcareOutreachDesc')}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#3c8a7a] font-['Poppins']">
                    {t('learnMore')}
                  </span>
                  <img src="/images/img_frame.svg" alt="arrow" className="w-[14px] h-[16px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Support Our Mission Section */}
      <section className="w-full bg-[#e5e7eb] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-[#1f2937] font-['Poppins'] mb-6">
              {t('supportOurMission')}
            </h2>
            <div className="max-w-[62%] mb-12">
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#374151] font-['Poppins'] mb-12">
                {t('supportOurMissionDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Кнопка: зелёная с белым текстом */}
                <button className="bg-[#3c8a7a] text-white font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <img src="/images/img_i.svg" alt="PayPal" className="w-[12px] h-[24px]" style={{filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) hue-rotate(0deg)'}} /> PayPal
                </button>
                <button className="bg-[#3c8a7a] text-white font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <img src="/images/img_i_deep_purple_a200.svg" alt="Stripe" className="w-[18px] h-[24px]" style={{filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) hue-rotate(0deg)'}} /> Stripe
                </button>
                <button className="bg-[#3c8a7a] text-white font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <img src="/images/img_i_orange_900.svg" alt="Fondy" className="w-[16px] h-[24px]" style={{filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) hue-rotate(0deg)'}} /> Fondy
                </button>
                {/* Кнопки: белые (раскомментируй, если хочешь белые) */}
                {/**
                <button className="bg-white text-[#3c8a7a] font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <img src="/images/img_i.svg" alt="PayPal" className="w-[12px] h-[24px]" /> PayPal
                </button>
                <button className="bg-white text-[#3c8a7a] font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <img src="/images/img_i_deep_purple_a200.svg" alt="Stripe" className="w-[18px] h-[24px]" /> Stripe
                </button>
                <button className="bg-white text-[#3c8a7a] font-semibold py-2 px-6 rounded shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <img src="/images/img_i_orange_900.svg" alt="Fondy" className="w-[16px] h-[24px]" /> Fondy
                </button>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonies Section */}
      <section id="testimonies" className="w-full bg-[#ffffff] py-12 sm:py-16 lg:py-16">
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
            {/* Testimony 1 */}
            <div className="bg-[#ffffff] rounded-[16px] p-6 lg:p-7 shadow-[0px_10px_15px_#00000019]">
              <p className="text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[26px] text-[#374151] font-['Poppins'] mb-16 lg:mb-[74px]">
                "{t('testimonyText')}".
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src="/images/img_ellipse_1.png" 
                  alt={t('sarahJohnson')} 
                  className="w-[52px] h-[52px] rounded-[26px]" 
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

            {/* Testimony 2 */}
            <div className="bg-[#ffffff] rounded-[16px] p-6 lg:p-7 shadow-[0px_10px_15px_#00000019]">
              <p className="text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[26px] text-[#374151] font-['Inter'] mb-16 lg:mb-[74px]">
                "{t('testimonyText')}".
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src="/images/img_ellipse_1.png" 
                  alt={t('sarahJohnson')} 
                  className="w-[52px] h-[52px] rounded-[26px]" 
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

            {/* Testimony 3 */}
            <div className="bg-[#ffffff] rounded-[16px] p-6 lg:p-7 shadow-[0px_10px_15px_#00000019]">
              <p className="text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[26px] text-[#374151] font-['Inter'] mb-16 lg:mb-[74px]">
                "{t('testimonyText')}".
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src="/images/img_ellipse_1.png" 
                  alt={t('sarahJohnson')} 
                  className="w-[52px] h-[52px] rounded-[26px]" 
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
          </div>
        </div>
      </section>
      {/* Contact Us Section */}
      <section id="contact" className="w-full bg-[#3c8a7a] py-12 sm:py-16 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] text-[#ffffff] font-['Poppins'] mb-3">
                {t('contactUs')}
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#dcfce7] font-['Poppins'] mb-8 max-w-[82%]">
                {t('contactUsDesc')}
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-[#ffffff] rounded-[24px] flex items-center justify-center">
                    <img src="/images/img_div_blue_gray_600.svg" alt="Address" className="w-[24px] h-[24px]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-[#ffffff] font-['Poppins']">
                      {t('address')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {t('addressValue')}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-[#ffffff] rounded-[24px] flex items-center justify-center">
                    <img src="/images/img_div_blue_gray_600_48x48.svg" alt="Phone" className="w-[24px] h-[24px]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-[#ffffff] font-['Poppins']">
                      {t('phone')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {t('phoneValue')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-[#ffffff] rounded-[24px] flex items-center justify-center">
                    <img src="/images/img_vector_blue_gray_600.svg" alt="Email" className="w-[24px] h-[24px]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-[#ffffff] font-['Poppins']">
                      {t('email')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {t('emailValue')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-[46%] bg-[#ffffff] rounded-[12px] p-6 lg:p-8 shadow-[0px_10px_15px_#00000019]">
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

                <div className="border border-[#d1d5db] rounded-[8px] bg-[#ffffff] pt-[10px] pr-[34px] pb-[10px] pl-[16px]">
                  <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#adaebc] font-['Poppins']">
                    {t('emailAddress')}
                  </span>
                </div>

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
                  <div className="bg-[#3c8a7a] rounded-[8px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] w-full flex justify-center">
                    <span className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-center text-[#ffffff] font-['Poppins'] py-2">
                      {t('sendMessageButton')}
                    </span>
                  </div>
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
                      About
                    </span>
                    <img src="/images/img_arrow_down_white_a700.svg" alt="dropdown" className="w-[10px] h-[6px]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      Projects
                    </span>
                    <img src="/images/img_arrow_down_white_a700.svg" alt="dropdown" className="w-[10px] h-[6px]" />
                  </div>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Fund
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Testimonies
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Training
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Story
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Shop
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Contact
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    Donate
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
                    +1 (555) 123-4567
                  </p>
                  <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    info@raphaelmission.org
                  </p>
                  <div>
                    <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      123 Mission Street
                    </p>
                    <p className="text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      Faith City, FC 12345
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

export default Home;