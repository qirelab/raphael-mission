import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { projectsService } from '../../services/projectsService';
import Button from '../../components/ui/Button';

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
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
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
        <Button onClick={() => navigate('/projects')}>
          {t('backToProjects') || 'Back to Projects'}
        </Button>
      </div>
    );
  }

  const title = project[`title_${language}`] || project.title_en;
  const description = project[`description_${language}`] || project.description_en;
  const heroDescription = project[`hero_description_${language}`] || project.hero_description_en;
  const whatWeDo = project[`what_we_do_${language}`] || project.what_we_do_en;
  const impactTitle = project[`impact_title_${language}`] || project.impact_title_en;
  const approachTitle = project[`approach_title_${language}`] || project.approach_title_en;

  const stats = [
    project[`stat1_${language}`] || project.stat1_en,
    project[`stat2_${language}`] || project.stat2_en,
    project[`stat3_${language}`] || project.stat3_en,
  ].filter(Boolean);

  const approaches = [
    project[`approach1_${language}`] || project.approach1_en,
    project[`approach2_${language}`] || project.approach2_en,
    project[`approach3_${language}`] || project.approach3_en,
    project[`approach4_${language}`] || project.approach4_en,
  ].filter(Boolean);

  // Галерея для Project Gallery
  const galleryImages = [
    '/images/about.png',
    '/images/projects.png',
    '/images/img_frame_blue_gray_100.svg',
    '/images/img_frame_blue_gray_100_16x14.svg',
    '/images/youtube.svg',
    '/images/public/images/service.png',
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
                  {heroDescription || description}
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
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2937]">About This Project</h2>
            <p className="text-[16px] sm:text-[18px] text-[#374151] mb-2">The Mobile Medical Clinics initiative delivers essential healthcare directly to underserved communities through specially equipped vehicles. These clinics provide basic medical services, vaccinations, health screenings, and emergency care to remote and urban areas alike.</p>
            <p className="text-[16px] sm:text-[18px] text-[#374151] mb-2">Our mobile units help bridge the gap in healthcare access where hospitals and clinics are scarce or inaccessible.</p>
            <p className="text-[16px] sm:text-[18px] text-[#374151]">By partnering with local health authorities and professionals, Raphael Mission ensures timely, compassionate care reaches those who need it most—especially children, the elderly, and people with chronic conditions.</p>
          </div>
        </div>
      </section>

      {/* Project Impact */}
      <section className="w-full bg-[#fafbfc] py-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-8 text-center text-[#1f2937]">Project Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#2eaf7d] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">8,000+</div>
                <div className="text-[16px]">Patients Served</div>
              </div>
              <div className="bg-[#3b82f6] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">15</div>
                <div className="text-[16px]">Mobile Units Deployed</div>
              </div>
              <div className="bg-[#8b5cf6] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">10</div>
                <div className="text-[16px]">Regions Covered</div>
              </div>
              <div className="bg-[#f97316] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">5 hrs</div>
                <div className="text-[16px]">Avg. Time Saved per Visit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="w-full bg-white py-10">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="text-[28px] sm:text-[32px] font-bold mb-8 text-center text-[#1f2937]">Project Gallery</h2>
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
                variant="outline"
                onClick={() => navigate('/training')}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-white border border-white text-[#3c8a7a] text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-gray-50 transition-colors duration-200"
              >
                {t('projectVolunteer')}
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/donation')}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-[#2F7D6D] border border-white text-white text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-[#266b5a] transition-colors duration-200"
              >
                {t('projectDonate')}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/questions-contact')}
                className="px-[24px] sm:px-[28px] py-[12px] sm:py-[14px] rounded-[8px] bg-transparent border-2 border-white text-white text-[16px] sm:text-[18px] font-semibold w-full sm:w-auto hover:bg-white/10 transition-colors duration-200"
              >
                {t('projectPrayerPartner')}
              </Button>
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
                <img
                  src="/images/img_frame_blue_gray_100.svg"
                  alt="Facebook"
                  className="w-[10px] h-[16px] transition-transform duration-200 hover:scale-110"
                />
                <img
                  src="/images/img_frame_blue_gray_100_16x14.svg"
                  alt="Twitter"
                  className="w-[14px] h-[16px] transition-transform duration-200 hover:scale-110"
                />
                <img
                  src="/images/youtube.svg"
                  alt="Youtube"
                  className="w-[18px] h-[16px] transition-transform duration-200 hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Navigation */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  {[
                    { href: '/about-mission', label: t('about') },
                    { href: '/projects', label: t('projects') },
                    { href: '/testimonies', label: t('testimonies') },
                    { href: '/training', label: t('training') },
                    { href: '/story', label: t('story') },
                    { href: '/shop', label: t('shop') },
                    { href: '/questions-contact', label: t('contact') },
                    { href: '/donation', label: t('donate') },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      className="relative block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] transition-colors hover:text-white
                                 after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                    >
                      {l.label}
                    </Link>
                  ))}
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
                  {[
                    { href: '/privacy-policy', label: t('privacyPolicy') },
                    { href: '/terms-of-service', label: t('termsOfService') },
                    { href: '/cookie-policy', label: t('cookiePolicy') },
                  ].map((l) => (
                    <Link
                      key={l.label}
                      to={l.href}
                      className="relative block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] transition-colors hover:text-white
                                 after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                    >
                      {l.label}
                    </Link>
                  ))}
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

export default ProjectDetail;
