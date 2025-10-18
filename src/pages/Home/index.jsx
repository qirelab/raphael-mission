// src/pages/Home/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import TextArea from '../../components/ui/TextArea';
import ButtonSkeleton from '../../components/ui/ButtonSkeleton';
import { useLanguage } from '../../context/LanguageContext';
import { projectsService } from '../../services/projectsService';
import { useTestimonies, useContactInfo } from '../../hooks/useApiData';
import { useAlert } from '../../hooks/useAlert';
import Footer from '../../components/common/Footer';
import { CardsGridSkeleton, TestimonialsGridSkeleton } from '../../components/skeletons';

// --- EmailJS ---
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [firstProjects, setFirstProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const { data: testimonies, loading: loadingTestimonies } = useTestimonies();
  const { data: contactData } = useContactInfo();

  const { t, language } = useLanguage();
  const { success, error, warning } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  // Load first projects and testimonies
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingProjects(true);
        const projects = await projectsService.getFirst(3);
        setFirstProjects(projects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    loadData();
  }, [language]);

  // Обработка якоря при загрузке страницы
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const validateEmail = (val) => {
    // простая проверка email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Валидация полей (минимальная, без изменения UI)
    if (!firstName.trim()) return warning('Введите имя', 'Поле обязательно');
    if (!lastName.trim()) return warning('Введите фамилию', 'Поле обязательно');
    if (!email.trim() || !validateEmail(email))
      return warning('Введите корректный email', 'Неверный формат');
    if (!subject.trim()) return warning('Укажите тему сообщения', 'Поле обязательно');
    if (!message.trim()) return warning('Напишите сообщение', 'Поле обязательно');

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      return error(
        'EmailJS не настроен: проверьте переменные окружения VITE_EMAILJS_*',
        'Ошибка конфигурации'
      );
    }

    setIsSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          firstName,
          lastName,
          email,
          subject,
          message,
          reply_to: email, // чтобы можно было ответить прямо из письма
        },
        { publicKey: PUBLIC_KEY }
      );

      success('Спасибо! Ваше сообщение отправлено.', 'Сообщение отправлено');
      // очистить форму
      setFirstName('');
      setLastName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('EmailJS error:', err);
      error('Не удалось отправить сообщение. Попробуйте еще раз позже.', 'Ошибка отправки');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full bg-[#ffffff]">
      {/* Hero Section */}
      <section
        className="w-full bg-[#ffffff] relative overflow-hidden"
        style={{ position: 'relative' }}
      >
        <div className="hero-bg-blur" />
        <div className="hero-bg-overlay" />
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(30,34,45,0.18)', zIndex: 2 }}
        />
        <div
          className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{ position: 'relative', zIndex: 4 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 py-8 sm:py-12 lg:py-16">
            {/* Logo (без hover) */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <img
                src="/images/img_logo_2.png"
                alt={`${t('brandName')} Logo`}
                className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[386px] lg:h-[384px]"
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
                  onClick={() => navigate(`/${language}/donate`)}
                >
                  {t('supportMission')}
                </Button>

                <Button
                  variant="outline"
                  className="pt-[18px] pr-[30px] pb-[18px] pl-[30px] text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[27px] text-center text-white font-['Poppins'] border-2 border-[#3b8a79] w-full sm:w-auto hover:bg-white/90 hover:text-gray-900 hover:shadow-lg transition-colors"
                  onClick={() => navigate(`/${language}/about-mission`)}
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
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#374151] font-['Poppins'] max-w-full md:max-w-[56%]">
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
                <p className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-[21px] text-[#e5e7eb] font-['Open_Sанс']">
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
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#4b5563] font-['Poppins'] max-w-full md:max-w-[60%]">
              {t('currentProjectsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[42px]">
            {loadingProjects ? (
              <CardsGridSkeleton
                count={3}
                showImages={true}
                showButtons={false}
                className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[42px]"
              />
            ) : firstProjects.length > 0 ? (
              firstProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-[#f9fafb] rounded-[12px] shadow-[0px_10px_15px_#00000019] overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative w-full h-[160px] sm:h-[180px] lg:h-[192px] overflow-hidden">
                    <img
                      src={project.image_url || '/images/img_img.png'}
                      alt={project[`title_${language}`] || project.title_en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/25 flex items-center justify-center">
                      <Link
                        to={`/${language}/projects/${project.slug}`}
                        className="text-white text-[14px] sm:text-[16px] font-semibold underline"
                      >
                        {t('learnMore')}
                      </Link>
                    </div>
                  </div>

                  <div className="p-5 lg:p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="text-[18px] lg:text-[20px] font-semibold leading-[27px] lg:leading-[30px] text-[#1f2937] font-['Poppins'] mb-3">
                        {project[`title_${language}`] || project.title_en}
                      </h3>
                      <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#4b5563] font-['Poppins'] line-clamp-2">
                        {project[`description_${language}`] || project.description_en}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-auto pt-4">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex items-center gap-2 text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#3c8a7a] font-['Poppins'] hover:underline"
                      >
                        {t('learnMore')}
                        <img
                          src="/images/img_frame.svg"
                          alt="arrow"
                          className="w-[14px] h-[16px]"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500 font-poppins">
                {t('noProjectsYet') || 'No projects yet. Add some in the admin panel!'}
              </div>
            )}
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
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[26px] lg:leading-[28px] text-white/90 font-['Poppins'] max-w-full md:max-w-[62%] mx-auto mb-12">
              {t('supportMissionDesc')}
            </p>

            <div className="w-full flex flex-wrap gap-6 justify-center">
              <button
                className="bg-white text-[#0070BA] font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                onClick={() => navigate(`/${language}/donation?method=paypal`)}
              >
                <img src="/images/payp.svg" alt="PayPal" className="w-[12px] h-[24px]" />
                PayPal
              </button>
              <button
                className="bg-white text-[#8454ec] font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                onClick={() => navigate(`/${language}/donation?method=stripe`)}
              >
                <img src="/images/stripe1.svg" alt="Stripe" className="w-[24px] h-[24px]" />
                Stripe
              </button>
              <button
                className="bg-white text-[#EB5B0E] font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                onClick={() => navigate(`/${language}/donation?method=fondy`)}
              >
                <img src="/images/fondy.svg" alt="Fondy" className="w-[22px] h-[24px]" />
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
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[24px] sm:leading-[28px] lg:leading-[30px] text-[#4b5563] font-['Poppins'] max-w-full md:max-w-[44%]">
              {t('testimoniesDesc')}
            </p>
          </div>

          {loadingTestimonies ? (
            <TestimonialsGridSkeleton count={3} />
          ) : testimonies && testimonies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px]">
              {testimonies.slice(0, 3).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-global-7 rounded-[12px] p-[24px] sm:p-[28px] md:p-[32px] shadow-[0px_10px_15px_rgba(0,0,0,0.1)] hover:shadow-[0px_15px_25px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                >
                  <div className="flex items-center mb-[20px] sm:mb-[24px]">
                    <img
                      src={testimonial.image || '/images/img_ellipse_1.png'}
                      alt={testimonial.name}
                      className="w-[64px] h-[64px] rounded-[32px] object-cover"
                    />
                    <div className="ml-[16px]">
                      <h3 className="text-[16px] font-semibold leading-[24px] text-global-2 mb-[2px] font-['Poppins']">
                        {testimonial.name}
                      </h3>
                      <p className="text-[14px] font-normal leading-[21px] text-global-5 font-['Poppins']">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-[16px] font-normal leading-[24px] text-global-4 font-['Poppins']">
                    "{testimonial.testimony}"
                  </blockquote>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 font-poppins">
              {t('noTestimoniesYet') || 'No testimonies yet. Add some in the admin panel!'}
            </div>
          )}
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
              <p className="max-w-full lg:max-w-[82%] mb-8 text-[16px] sm:text-[18px] lg:text-[20px] leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#dcfce7] font-['Poppins']">
                {t('contactUsDesc')}
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <img
                      src="/images/img_div_blue_gray_600.svg"
                      alt={t('addressLabel')}
                      className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins']">
                      {t('addressLabel')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {contactData?.[`address_line1_${language}`] ||
                        contactData?.address_line1_en ||
                        contactData?.address_line1 ||
                        t('addressLine')}
                      {(contactData?.[`address_line2_${language}`] ||
                        contactData?.address_line2_en ||
                        contactData?.address_line2) && (
                        <>
                          <br />
                          {contactData?.[`address_line2_${language}`] ||
                            contactData?.address_line2_en ||
                            contactData?.address_line2}
                        </>
                      )}
                      <br />
                      {contactData?.city && contactData?.country
                        ? `${contactData.city}, ${contactData.country}`
                        : contactData?.city || contactData?.country || 'Faith City, FC 12345'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <img
                      src="/images/img_div_blue_gray_600_48x48.svg"
                      alt={t('phoneLabel')}
                      className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins']">
                      {t('phoneLabel')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {contactData?.phone_number || t('phoneNumber')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <img
                      src="/images/img_vector_blue_gray_600.svg"
                      alt={t('emailLabel')}
                      className="w-[24px] h-[24px] transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins']">
                      {t('emailLabel')}
                    </h3>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#dcfce7] font-['Poppins']">
                      {contactData?.email || t('emailAddress')}
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
                  {isSending ? (
                    <div className="w-full bg-[#3c8a7a] rounded-[8px] px-4 py-2 flex justify-center items-center min-h-[48px]">
                      <span className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                        <span className="text-white font-medium text-[14px] lg:text-[16px] font-['Poppins']">
                          Отправка...
                        </span>
                      </span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#3c8a7a] rounded-[8px] px-4 py-2 w-full flex justify-center hover:bg-[#2f7d6d] transition-colors duration-200 min-h-[48px]"
                    >
                      <span className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-center text-white font-['Poppins'] py-1.5">
                        {t('sendMessage')}
                      </span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
