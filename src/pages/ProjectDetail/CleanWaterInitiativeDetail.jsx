import React from 'react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const CleanWaterInitiativeDetail = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const galleryImages = [
    '/images/about.png',
    '/images/projects.png',
  ];
  return (
    <div className="w-full bg-[#ffffff]">
      <section className="relative w-full min-h-[400px] bg-[#1f475b] flex items-center justify-center">
        <h1 className="text-white text-[40px] font-bold">{t('cleanWaterInitiativeTitle')}</h1>
      </section>
      <section className="w-full bg-white py-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2937]">{t('aboutThisProject')}</h2>
            <p className="text-[16px] sm:text-[18px] text-[#374151] mb-2">{t('cleanWaterAbout')}</p>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#fafbfc] py-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-8 text-center text-[#1f2937]">{t('projectImpact')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#2eaf7d] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">12,000+</div>
                <div className="text-[16px]">{t('cleanWaterImpact1')}</div>
              </div>
              <div className="bg-[#3b82f6] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">35</div>
                <div className="text-[16px]">{t('cleanWaterImpact2')}</div>
              </div>
              <div className="bg-[#8b5cf6] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">18</div>
                <div className="text-[16px]">{t('cleanWaterImpact3')}</div>
              </div>
              <div className="bg-[#f97316] rounded-lg p-6 flex flex-col items-start text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-[28px] font-bold mb-1">60%</div>
                <div className="text-[16px]">{t('cleanWaterImpact4')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <section className="w-full bg-[#3c8a7a] py-16">
        <div className="max-w-[900px] mx-auto text-center">
          <Button onClick={() => navigate('/projects')}>{t('backToProjects')}</Button>
        </div>
      </section>
    </div>
  );
};
export default CleanWaterInitiativeDetail;
