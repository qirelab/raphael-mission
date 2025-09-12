import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const projectsData = [
    {
      id: 1,
      titleKey: "streetEvangelismTitle",
      descriptionKey: "streetEvangelismDesc",
      image: "/images/img_img_192x384.png"
    },
    {
      id: 2,
      titleKey: "tentEvangelismTitle",
      descriptionKey: "tentEvangelismDesc",
      image: "/images/img_img_1.png"
    },
    {
      id: 3,
      titleKey: "personalEvangelismTitle",
      descriptionKey: "personalEvangelismDesc",
      image: "/images/img_img_2.png"
    },
    {
      id: 4,
      titleKey: "socialProjectsTitle",
      descriptionKey: "socialProjectsDesc",
      image: "/images/img_img_3.png"
    },
    {
      id: 5,
      titleKey: "artEvangelismTitle",
      descriptionKey: "artEvangelismDesc",
      image: "/images/img_img_4.png"
    },
    {
      id: 6,
      titleKey: "churchSupportTitle",
      descriptionKey: "churchSupportDesc",
      image: "/images/img_img_5.png"
    },
    {
      id: 7,
      titleKey: "healingMinistryTitle",
      descriptionKey: "healingMinistryDesc",
      image: "/images/img_img_6.png"
    }
  ];

  const statsData = [
    { number: "500+", labelKey: "livesTouched" },
    { number: "25+", labelKey: "communitiesServed" },
    { number: "7", labelKey: "activeProjects" }
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-col justify-start items-center w-full">
          {/* Header */}
          <Header />

          {/* Hero Section */}
          <section className="relative w-full min-h-[400px]">
            <div className="absolute inset-0 bg-[url('/images/projects.png')] bg-cover bg-center z-0"></div>
            <div className="absolute inset-0 bg-[rgba(18,60,52,0.6)] z-10"></div>
            <div className="relative z-20 w-full">
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center w-full py-[80px] sm:py-[96px] md:py-[112px] lg:py-[128px]">
                  <div className="flex flex-col justify-center items-center w-full max-w-[900px] px-[22px] sm:px-[32px] md:px-[44px]">
                    <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-poppins font-bold leading-[44px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] text-center text-white mb-[16px] sm:mb-[20px] md:mb-[24px]">
                      {t('projectsPageTitle')}
                    </h1>
                    <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-poppins font-normal leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px] text-center text-gray-200 w-full">
                      {t('projectsPageDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Grid Section */}
          <section className="w-full bg-global-6 py-[64px] sm:py-[80px] md:py-[88px] lg:py-[96px]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center w-full">
                <div className="w-full px-[16px] sm:px-[24px] md:px-[32px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px] w-full">
                    {projectsData?.map((project, index) => (
                      <div 
                        key={project?.id}
                        className={`flex flex-col justify-start items-center w-full bg-global-6 rounded-[12px] shadow-[0px_10px_15px_#00000019] h-full ${
                          index === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                        }`}
                      >
                        <img 
                          src={project?.image} 
                          alt={t(project?.titleKey)}
                          className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[192px] object-cover rounded-t-[12px]" 
                        />
                        <div className="flex flex-col justify-between items-start w-full flex-1 pt-[16px] sm:pt-[18px] md:pt-[20px] lg:pt-[22px] pr-[18px] sm:pr-[20px] md:pr-[22px] lg:pr-[24px] pb-[16px] sm:pb-[18px] md:pb-[20px] lg:pb-[22px] pl-[18px] sm:pl-[20px] md:pl-[22px] lg:pl-[24px]">
                          <div className="flex flex-col w-full">
                            <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-left text-global-1 mb-[6px]">
                              {t(project?.titleKey)}
                            </h3>
                            <p className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] text-left text-global-3 w-full mb-[12px] sm:mb-[14px] md:mb-[15px] lg:mb-[16px]">
                              {t(project?.descriptionKey)}
                            </p>
                          </div>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => {}}
                            className="pt-[4px] sm:pt-[5px] md:pt-[5px] lg:pt-[6px] pr-[10px] sm:pr-[12px] md:pr-[13px] lg:pr-[14px] pb-[4px] sm:pb-[5px] md:pb-[5px] lg:pb-[6px] pl-[14px] sm:pl-[16px] md:pl-[18px] lg:pl-[20px] rounded-[8px] text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] font-medium leading-[18px] sm:leading-[19px] md:leading-[20px] lg:leading-[21px] mt-auto"
                          >
                            {t('learnMoreBtn')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="w-full bg-[#F3F4F6] py-[64px] sm:py-[80px] md:py-[88px] lg:py-[96px]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center w-full">
                <div className="flex flex-col justify-start items-center w-full max-w-[1200px]">
                  <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-poppins font-bold leading-[36px] sm:leading-[40px] md:leading-[44px] lg:leading-[48px] text-center text-gray-900 mb-[16px] sm:mb-[20px] md:mb-[24px]">
                    {t('transformingLivesTitle')}
                  </h2>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-center text-gray-600 w-full max-w-[700px] mb-[48px] sm:mb-[56px] md:mb-[64px] lg:mb-[72px]">
                    {t('transformingLivesDesc')}
                  </p>

                  {/* Statistics */}
                  <div className="flex flex-col sm:flex-row gap-[40px] sm:gap-[60px] md:gap-[80px] lg:gap-[100px] w-full justify-center items-center">
                    {statsData?.map((stat, index) => (
                      <div key={index} className="flex flex-col justify-center items-center text-center">
                        <div className="flex justify-center items-center mb-[8px] sm:mb-[10px] md:mb-[12px]">
                          <span className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-poppins font-bold leading-tight text-[#2F7D6D]">
                            {stat?.number}
                          </span>
                        </div>
                        <div className="flex justify-center items-center">
                          <span className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal leading-relaxed text-gray-600">
                            {t(stat?.labelKey)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="w-full bg-[#3c8a7a] py-[64px] sm:py-[80px] md:py-[88px] lg:py-[96px]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center w-full">
                <div className="flex flex-col gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[36px] justify-start items-center w-full max-w-[1000px]">
                  <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-poppins font-bold leading-[36px] sm:leading-[40px] md:leading-[44px] lg:leading-[48px] text-center text-white w-full max-w-[800px]">
                    {t('joinUsTitle')}
                  </h2>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-center text-white w-full max-w-[700px]">
                    {t('joinUsDesc')}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-[16px] justify-center items-center w-full mt-[16px] sm:mt-[20px] md:mt-[24px]">
                    <Button
                      variant="outline"
                      onClick={() => {}}
                      className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-white border border-[#D1D5DB] text-gray-700 text-[16px] sm:text-[17px] md:text-[18px] font-semibold leading-[24px] sm:leading-[26px] md:leading-[28px] w-full sm:w-auto hover:bg-gray-50 transition-colors duration-200"
                    >
                      {t('getInvolved')}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/donate')}
                      className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-[#2F7D6D] border border-white text-white text-[16px] sm:text-[17px] md:text-[18px] font-semibold leading-[24px] sm:leading-[26px] md:leading-[28px] w-full sm:w-auto hover:bg-[#266b5a] transition-colors duration-200"
                    >
                      {t('donateNow')}
                    </Button>
                  </div>
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
      </div>
    </div>
  );
};

export default Projects;
