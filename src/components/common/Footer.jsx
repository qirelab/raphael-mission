import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useContact } from '../../context/ContactContext';
import { ContactInfoSkeleton } from '../skeletons';
import Instagram from '../icons/Instagram';
import Telegram from '../icons/Telegram';

const Footer = () => {
  const { t, language } = useLanguage();
  const { contactData, loading } = useContact();

  return (
    <footer className="w-full bg-[#333333] py-8 lg:py-10">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="w-full lg:w-[22%]">
            <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-white font-['Poppins'] mb-4">
              {t('brandName')}
            </h3>
            <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] max-w-[94%]">
              {t('footerDesc')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
            {/* Navigation */}
            <div className="w-full lg:w-[18%]">
              <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                {t('navigation')}
              </h4>
              <div className="space-y-2">
                {[
                  { href: `/${language}/about-mission`, label: t('about') },
                  { href: `/${language}/projects`, label: t('projects') },
                  { href: `/${language}/testimonies`, label: t('testimonies') },
                  // { href: `/${language}/training`, label: t('training') }, // Temporarily hidden
                  { href: `/${language}/shop`, label: t('shop') },
                  { href: `/${language}/story`, label: t('story') },
                  { href: `/${language}/contact`, label: t('contact') },
                  { href: `/${language}/donation`, label: t('donate') },
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
                {loading ? (
                  <ContactInfoSkeleton />
                ) : (
                  <>
                    {contactData?.phone_number ? (
                      <a
                        href={`tel:${contactData.phone_number}`}
                        className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] hover:text-white transition-colors"
                      >
                        {contactData.phone_number}
                      </a>
                    ) : (
                      <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                        {t('phoneNumber')}
                      </p>
                    )}

                    {contactData?.email ? (
                      <a
                        href={`mailto:${contactData.email}`}
                        className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] hover:text-white transition-colors"
                      >
                        {contactData.email}
                      </a>
                    ) : (
                      <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                        {t('emailAddress')}
                      </p>
                    )}

                    {(() => {
                      const addressParts = [
                        contactData?.[`address_line1_${language}`] || contactData?.address_line1_en || contactData?.address_line1,
                        contactData?.[`address_line2_${language}`] || contactData?.address_line2_en || contactData?.address_line2,
                        contactData?.city,
                        contactData?.country
                      ].filter(Boolean);

                      const hasAddress = addressParts.length > 0;

                      return hasAddress ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressParts.join(', '))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:text-white transition-colors"
                        >
                          {(contactData?.[`address_line1_${language}`] ||
                            contactData?.address_line1_en ||
                            contactData?.address_line1) && (
                            <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                              {contactData?.[`address_line1_${language}`] ||
                                contactData?.address_line1_en ||
                                contactData?.address_line1}
                            </p>
                          )}
                          {(contactData?.[`address_line2_${language}`] ||
                            contactData?.address_line2_en ||
                            contactData?.address_line2) && (
                            <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                              {contactData?.[`address_line2_${language}`] ||
                                contactData?.address_line2_en ||
                                contactData?.address_line2}
                            </p>
                          )}
                          {(contactData?.city || contactData?.country) && (
                            <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                              {contactData?.city && contactData?.country
                                ? `${contactData.city}, ${contactData.country}`
                                : contactData?.city || contactData?.country}
                            </p>
                          )}
                        </a>
                      ) : (
                        <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                          {t('addressLine')}
                        </p>
                      );
                    })()}
                  </>
                )}
              </div>
            </div>

            {/* Legal */}
            <div className="w-full lg:w-[42%]">
              <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                {t('legal')}
              </h4>
              <div className="space-y-2">
                {[
                  { href: `/${language}/privacy-policy`, label: t('privacyPolicy') },
                  { href: `/${language}/terms-of-service`, label: t('termsOfService') },
                  { href: `/${language}/cookie-policy`, label: t('cookiePolicy') },
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

            {/* Follow Us */}
            <div className="w-full lg:w-auto">
              <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                {t('followUs')}
              </h4>
              <p className="text-[12px] lg:text-[14px] leading-[18px] lg:leading-[20px] text-[#d1d5db] font-['Poppins'] mb-4 max-w-[200px]">
                {t('followUsDesc')}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/i.m.raphael"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#d1d5db]/10 hover:bg-[#E1306C] rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  aria-label={t('instagram')}
                >
                  <Instagram className="w-5 h-5 text-[#d1d5db] group-hover:text-white transition-colors" />
                </a>
                {language === 'ru' && (
                  <a
                    href="https://t.me/+3S7xzFVZtJ0xNDY0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#d1d5db]/10 hover:bg-[#0088cc] rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                    aria-label={t('telegram')}
                  >
                    <Telegram className="w-5 h-5 text-[#d1d5db] group-hover:text-white transition-colors" />
                  </a>
                )}
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
  );
};

export default Footer;
