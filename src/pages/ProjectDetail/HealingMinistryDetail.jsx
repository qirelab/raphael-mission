import React from 'react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const HealingMinistryDetail = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const galleryImages = [
    '/images/about.png',
    '/images/projects.png',
  ];
  return (
    <div className="w-full bg-[#ffffff]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[400px] bg-[#1f475b] flex items-center justify-center">
        <h1 className="text-white text-[40px] font-bold">{t('healingMinistryTitle')}</h1>
      </section>
      {/* About */}
      <section className="w-full bg-white py-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2937]">{t('aboutThisProject')}</h2>
            <p className="text-[16px] sm:text-[18px] text-[#374151] mb-2">{t('healingMinistryAbout')}</p>
          </div>
        </div>
      </section>
      {/* Gallery */}
      <section className="w-full bg-white py-10">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="text-[28px] sm:text-[32px] font-bold mb-8 text-center text-[#1f2937]">{t('projectGallery')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {galleryImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Gallery ${idx + 1}`} className="rounded-lg object-cover w-full h-[160px] sm:h-[140px] md:h-[160px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" />
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="w-full bg-[#3c8a7a] py-16">
        <div className="max-w-[900px] mx-auto text-center">
          <Button onClick={() => navigate('/projects')}>{t('backToProjects')}</Button>
        </div>
      </section>
    </div>
  );
};
export default HealingMinistryDetail;
