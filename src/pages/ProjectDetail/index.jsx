import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { projectsService } from '../../services/projectsService';
import Button from '../../components/ui/Button';
import Footer from '../../components/common/Footer';
import { ProjectDetailSkeleton } from '../../components/skeletons';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const data = await projectsService.getBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error loading project:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full bg-white">
        <ProjectDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
          {t('projectNotFound') || 'Project Not Found'}
        </h1>
        <p className="text-gray-600 font-poppins mb-8">
          {t('projectNotFoundDesc') || 'The project you are looking for does not exist.'}
        </p>
        <Button onClick={() => navigate(`/${language}/projects`)}>
          {t('backToProjects') || 'Back to Projects'}
        </Button>
      </div>
    );
  }

  const title = project[`title_${language}`] || project.title_en;
  const description = project[`description_${language}`] || project.description_en;
  const aboutProject = project[`about_project_${language}`] || project.about_project_en;
  const whatWeDo = project[`what_we_do_${language}`] || project.what_we_do_en;
  const impactDescription =
    project[`impact_description_${language}`] || project.impact_description_en;

  const stats = [
    project[`stat1_${language}`] || project.stat1_en,
    project[`stat2_${language}`] || project.stat2_en,
    project[`stat3_${language}`] || project.stat3_en,
  ].filter(Boolean);

  // Галерея для Project Gallery
  const galleryImages =
    project.gallery_images && project.gallery_images.length > 0
      ? project.gallery_images
      : [
          '/images/about.png',
          '/images/projects.png',
          '/images/img_frame_blue_gray_100.svg',
          '/images/img_frame_blue_gray_100_16x14.svg',
          '/images/youtube.svg',
          '/images/service.png',
        ];

  return (
    <div className="w-full bg-[#ffffff]">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[500px]"
        style={{
          backgroundImage: `url(${project.image_url || '/images/projects.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(31,71,91,0.75)] z-10" />
        <div className="relative z-20 w-full">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center w-full py-[100px] sm:py-[120px] md:py-[140px]">
              <div className="flex flex-col justify-center items-center w-full max-w-[900px] text-center">
                <h1 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[72px] font-poppins font-bold leading-[48px] sm:leading-[60px] md:leading-[68px] lg:leading-[80px] text-white mb-[24px]">
                  {title}
                </h1>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[28px] md:leading-[30px] text-white max-w-[800px]">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About This Project */}
      <section className="w-full bg-white py-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2937]">
              {language === 'ru'
                ? 'Об этом проекте'
                : language === 'pl'
                  ? 'O tym projekcie'
                  : 'About This Project'}
            </h2>
            <div className="text-[16px] sm:text-[18px] text-[#374151] whitespace-pre-line">
              {aboutProject ||
                (language === 'ru'
                  ? 'Подробная информация о проекте будет добавлена в ближайшее время.'
                  : language === 'pl'
                    ? 'Szczegółowe informacje o projekcie zostaną dodane wkrótce.'
                    : 'Detailed project information will be added soon.')}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      {whatWeDo && (
        <section className="w-full bg-[#fafbfc] py-10">
          <div className="max-w-[900px] mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2937]">
                {language === 'ru'
                  ? 'Чем мы занимаемся'
                  : language === 'pl'
                    ? 'Czym się zajmujemy'
                    : 'What We Do'}
              </h2>
              <div className="text-[16px] sm:text-[18px] text-[#374151] whitespace-pre-line">
                {whatWeDo}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Impact */}
      <section className="w-full bg-[#fafbfc] py-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-8 text-center text-[#1f2937]">
              {language === 'ru'
                ? 'Влияние проекта'
                : language === 'pl'
                  ? 'Wpływ projektu'
                  : 'Project Impact'}
            </h2>
            {impactDescription && (
              <div className="mb-8 text-[16px] sm:text-[18px] text-[#374151] text-center">
                {impactDescription}
              </div>
            )}
            {stats.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-200 flex flex-col"
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          index % 4 === 0
                            ? 'bg-[#2eaf7d]'
                            : index % 4 === 1
                              ? 'bg-[#3b82f6]'
                              : index % 4 === 2
                                ? 'bg-[#8b5cf6]'
                                : 'bg-[#f97316]'
                        }`}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-200 mb-4"></div>

                    {/* Stat Text - прижат к верху */}
                    <div className="text-center mb-4">
                      <div className="text-[16px] font-bold text-[#1f2937]">{stat}</div>
                    </div>

                    {/* Achievement Label - прижат к низу */}
                    <div className="text-center mt-auto">
                      <div className="text-[12px] text-gray-400 font-normal">
                        {language === 'ru'
                          ? 'Достижение'
                          : language === 'pl'
                            ? 'Osiągnięcie'
                            : 'Achievement'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="w-full bg-white py-10">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="text-[28px] sm:text-[32px] font-bold mb-8 text-center text-[#1f2937]">
            {language === 'ru'
              ? 'Галерея проекта'
              : language === 'pl'
                ? 'Galeria projektu'
                : 'Project Gallery'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {galleryImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="rounded-lg object-cover w-full h-[160px] sm:h-[140px] md:h-[160px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="w-full bg-[#3c8a7a] py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold leading-[40px] sm:leading-[44px] lg:leading-[48px] text-white font-poppins mb-6">
              {t('projectGetInvolvedTitle')}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-white/90 font-poppins mb-12">
              {t('projectGetInvolvedDesc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => navigate(`/${language}/donation`)}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-[#2F7D6D] border border-white text-white text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-[#266b5a] transition-colors duration-200"
              >
                {t('projectDonate')}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/${language}/contact`)}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-white border-2 border-white text-[#2F7D6D] text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-gray-50 transition-colors duration-200"
              >
                {t('projectPrayerPartner')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
