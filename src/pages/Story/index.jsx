import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Footer from '../../components/common/Footer';
import { StorySkeleton } from '../../components/skeletons';

const Story = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/images/ludi.jpg';
  }, []);

  if (!imageLoaded) {
    return (
      <div className="w-full bg-[#ffffff]">
        <StorySkeleton />
        <Footer />
      </div>
    );
  }

  const milestones = [
    { year: '2010', key: 'storyMilestone1' },
    { year: '2012', key: 'storyMilestone2' },
    { year: '2015', key: 'storyMilestone3' },
    { year: '2017', key: 'storyMilestone4' },
    { year: '2020', key: 'storyMilestone5' },
    { year: '2022', key: 'storyMilestone6' },
    { year: '2025', key: 'storyMilestone7' },
  ];

  return (
    <div className="w-full bg-[#ffffff]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] bg-[url('/images/ludi.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[rgba(31,71,91,0.75)] z-10" />
        <div className="relative z-20 w-full">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center w-full py-[100px] sm:py-[120px] md:py-[140px]">
              <div className="flex flex-col justify-center items-center w-full max-w-[900px] text-center">
                <h1 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[72px] font-poppins font-bold leading-[48px] sm:leading-[60px] md:leading-[68px] lg:leading-[80px] text-white mb-[16px]">
                  {t('storyPageTitle')}
                </h1>
                <p className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-poppins font-medium leading-[28px] sm:leading-[30px] md:leading-[32px] lg:leading-[34px] text-[#dcfce7] mb-[24px]">
                  {t('storyPageSubtitle')}
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[28px] md:leading-[30px] text-white max-w-[800px]">
                  {t('storyHeroDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="w-full bg-[#F6F7F9] py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* The Founding */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block bg-[#3c8a7a] text-white px-6 py-2 rounded-full text-[14px] sm:text-[16px] font-semibold font-poppins">
                  {t('storyFoundingYear')}
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold leading-[40px] sm:leading-[44px] lg:leading-[48px] text-[#1f2937] font-poppins mb-6">
                {t('storyFoundingTitle')}
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-[#4b5563] font-poppins">
                {t('storyFoundingDesc')}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/comanda.jpg"
                alt="Founding"
                className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover rounded-[16px] shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Growing Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            <div className="flex items-center justify-center order-2 lg:order-1">
              <img
                src="/images/volontery.jpg"
                alt="Growing Impact"
                className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover rounded-[16px] shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <div className="mb-6">
                <span className="inline-block bg-[#3c8a7a] text-white px-6 py-2 rounded-full text-[14px] sm:text-[16px] font-semibold font-poppins">
                  {t('storyGrowthYear')}
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold leading-[40px] sm:leading-[44px] lg:leading-[48px] text-[#1f2937] font-poppins mb-6">
                {t('storyGrowthTitle')}
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-[#4b5563] font-poppins">
                {t('storyGrowthDesc')}
              </p>
            </div>
          </div>

          {/* Today & Beyond */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block bg-[#3c8a7a] text-white px-6 py-2 rounded-full text-[14px] sm:text-[16px] font-semibold font-poppins">
                  {t('storyTodayYear')}
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold leading-[40px] sm:leading-[44px] lg:leading-[48px] text-[#1f2937] font-poppins mb-6">
                {t('storyTodayTitle')}
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-[#4b5563] font-poppins">
                {t('storyTodayDesc')}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/mission.jpg"
                alt="Today"
                className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover rounded-[16px] shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-center text-[#1f2937] font-poppins mb-12 lg:mb-16">
            {t('storyMilestonesTitle')}
          </h2>

          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#3c8a7a] opacity-20" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div className="bg-[#f9fafb] rounded-[12px] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <p className="text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] text-[#374151] font-poppins">
                        {t(milestone.key)}
                      </p>
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="flex items-center justify-center md:w-2/12">
                    <div className="bg-[#3c8a7a] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10">
                      <span className="text-[18px] font-bold font-poppins">{milestone.year}</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full bg-[#3c8a7a] py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold leading-[40px] sm:leading-[44px] lg:leading-[48px] text-white font-poppins mb-6">
              {t('storyVisionTitle')}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-white/90 font-poppins mb-12">
              {t('storyVisionDesc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate(`/${language}/projects`)}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-white border border-white text-[#3c8a7a] text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-gray-50 transition-colors duration-200"
              >
                {t('projects')}
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/${language}/donation`)}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-[#2F7D6D] border border-white text-white text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-[#266b5a] transition-colors duration-200"
              >
                {t('donate')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Story;
