import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useProjects } from '../../context/ProjectsContext';
import Footer from '../../components/common/Footer';
import { CardsGridSkeleton, HeroSkeleton } from '../../components/skeletons';

const Projects = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  // Transform projects for display
  const projectsData = useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      title: p[`title_${language}`] || p.title_en,
      description: p[`description_${language}`] || p.description_en,
      image: p.image_url || '/images/img_img_192x384.png',
      link: `/projects/${p.slug}`,
    }));
  }, [projects, language]);

  const statsData = [
    { number: '500+', labelKey: 'livesTouched' },
    { number: '25+', labelKey: 'communitiesServed' },
    { number: '7', labelKey: 'activeProjects' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-col justify-start items-center w-full">
            {/* Hero Section Skeleton */}
            <section className="relative w-full min-h-[400px]">
              <div className="absolute inset-0 bg-gray-200 z-0" />
              <div className="relative z-20 w-full">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center items-center w-full py-[80px] sm:py-[96px] md:py-[112px] lg:py-[128px]">
                    <div className="flex flex-col justify-center items-center w-full max-w-[900px] px-[22px] sm:px-[32px] md:px-[44px]">
                      <HeroSkeleton />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section Skeleton */}
            <section className="w-full bg-white py-12 lg:py-16">
              <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div className="animate-pulse bg-gray-200 rounded h-12 w-24 mx-auto mb-2"></div>
                      <div className="animate-pulse bg-gray-200 rounded h-6 w-32 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section Skeleton */}
            <section className="w-full bg-gray-50 py-12 lg:py-16">
              <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="animate-pulse bg-gray-200 rounded h-10 w-64 mx-auto mb-4"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-6 w-96 mx-auto"></div>
                </div>
                <CardsGridSkeleton count={6} />
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-col justify-start items-center w-full">
          {/* Hero Section */}
          <section className="relative w-full min-h-[400px]">
            <div className="absolute inset-0 bg-[url('/images/projects.png')] bg-cover bg-center z-0" />
            <div className="absolute inset-0 bg-[rgba(18,60,52,0.6)] z-10" />
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
                    {loading ? (
                      <CardsGridSkeleton
                        count={6}
                        showImages={true}
                        showButtons={false}
                        className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px]"
                      />
                    ) : (
                      projectsData.map((project, index) => (
                        <a
                          key={project.id}
                          href={project.link}
                          className={`group flex flex-col justify-start items-center w-full bg-global-6 rounded-[12px] shadow-[0px_10px_15px_#00000019] h-full overflow-hidden transform transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15 focus-within:-translate-y-1 ${
                            index === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                          }`}
                          style={{ textDecoration: 'none' }}
                        >
                          <img
                            src={project.image}
                            alt={project.title || t(project.titleKey)}
                            className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[192px] object-cover rounded-t-[12px] transition-transform duration-300 ease-out group-hover:scale-105 cursor-pointer"
                          />
                          <div className="flex flex-col justify-between items-start w-full flex-1 pt-[16px] sm:pt-[18px] md:pt-[20px] lg:pt-[22px] pr-[18px] sm:pr-[20px] md:pr-[22px] lg:pr-[24px] pb-[16px] sm:pb-[18px] md:pb-[20px] lg:pb-[22px] pl-[18px] sm:pl-[20px] md:pl-[22px] lg:pl-[24px]">
                            <div className="flex flex-col w-full">
                              <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-left text-global-1 mb-[6px]">
                                {project.title || t(project.titleKey)}
                              </h3>
                              <p className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] text-left text-global-3 w-full mb-[12px] sm:mb-[14px] md:mb-[15px] lg:mb-[16px]">
                                {project.description || t(project.descriptionKey)}
                              </p>
                            </div>
                            <Button
                              variant="primary"
                              size="small"
                              className="pt-[4px] sm:pt-[5px] md:pt-[5px] lg:pt-[6px] pr-[10px] sm:pr-[12px] md:pr-[13px] lg:pr-[14px] pb-[4px] sm:pb-[5px] md:pb-[5px] lg:pb-[6px] pl-[14px] sm:pl-[16px] md:pl-[18px] lg:pl-[20px] rounded-[8px] text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] font-medium leading-[18px] sm:leading-[19px] md:leading-[20px] lg:leading-[21px] mt-auto transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7D6D]/50 cursor-pointer"
                            >
                              {t('learnMoreBtn')}
                            </Button>
                          </div>
                        </a>
                      ))
                    )}
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
                  <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-poppins font-bold text-center text-gray-900 mb-[16px] sm:mb-[20px] md:mb-[24px]">
                    {t('transformingLivesTitle')}
                  </h2>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal text-center text-gray-600 w-full max-w-[700px] mb-[48px] sm:mb-[56px] md:mb-[64px] lg:mb-[72px]">
                    {t('transformingLivesDesc')}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-[40px] sm:gap-[60px] md:gap-[80px] lg:gap-[100px] w-full justify-center items-center">
                    {statsData.map((stat, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-center items-center text-center"
                      >
                        <div className="flex justify-center items-center mb-[8px] sm:mb-[10px] md:mb-[12px]">
                          <span className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-poppins font-bold leading-tight text-[#2F7D6D]">
                            {stat.number}
                          </span>
                        </div>
                        <div className="flex justify-center items-center">
                          <span className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal leading-relaxed text-gray-600">
                            {t(stat.labelKey)}
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
                  <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-poppins font-bold text-center text-white w-full max-w-[800px]">
                    {t('joinUsTitle')}
                  </h2>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal text-center text-white w-full max-w-[700px]">
                    {t('joinUsDesc')}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-[16px] justify-center items-center w-full mt-[16px] sm:mt-[20px] md:mt-[24px]">
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = '/training')}
                      className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-white border border-[#D1D5DB] text-gray-700 text-[16px] sm:text-[17px] md:text-[18px] font-semibold w-full sm:w-auto hover:bg-gray-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {t('getInvolved')}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/${language}/donate`)}
                      className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-[#2F7D6D] border border-white text-white text-[16px] sm:text-[17px] md:text-[18px] font-semibold w-full sm:w-auto hover:bg-[#266b5a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {t('donateNow')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Projects;
