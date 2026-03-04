// src/pages/QuestionsContact/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useContact } from '../../context/ContactContext';
import Footer from '../../components/common/Footer';
import { ContactInfoSkeleton, ContactSkeleton } from '../../components/skeletons';

const QuestionsContact = () => {
  const { t, language } = useLanguage();
  const { contactData, loading } = useContact();

  if (loading) {
    return (
      <div className="w-full bg-[#F6F7F9]">
        <ContactSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F6F7F9]">
      <main>
        {/* WAYS TO CONNECT */}
        <section className="w-full bg-[#F6F7F9] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1292px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] font-[Poppins] font-normal text-center text-[#1F7A5B]">
              {t('waysToConnectTitle')}
            </h2>

            <div
              className="
                mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8
                place-items-center
                max-w-[1100px] mx-auto
                pb-20 md:pb-24
              "
            >
              {/* Call Us */}
              <div className="group w-full max-w-[350px] rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF] p-6 sm:p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(59,130,246,0.15)] hover:border-[#CFE3FF] hover:bg-[#EAF2FF]">
                <div className="mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DFEAFF] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D3E4FF]">
                  <img
                    src="/images/callus.png"
                    alt="Phone icon"
                    className="w-15 h-15 sm:w-15 sm:h-15"
                  />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">
                  {t('callUs')}
                </h3>
                {loading ? (
                  <p className="mt-2 text-[16px] sm:text-[18px] font-[Poppins] text-[#334155]">
                    <div className="animate-pulse bg-gray-200 rounded h-6 w-32 mx-auto"></div>
                  </p>
                ) : contactData?.phone_number ? (
                  <a
                    href={`tel:${contactData.phone_number}`}
                    className="mt-2 inline-block text-[16px] sm:text-[18px] font-[Poppins] text-[#334155] hover:text-[#0f172a] transition-colors"
                  >
                    {contactData.phone_number}
                  </a>
                ) : (
                  <p className="mt-2 text-[16px] sm:text-[18px] font-[Poppins] text-[#334155]">
                    {t('phoneNumber')}
                  </p>
                )}
                <p className="mt-1 text-[13px] sm:text-[14px] font-[Poppins] text-[#64748b]">
                  {t('phoneWorkHoursShort')}
                </p>
              </div>

              {/* Address */}
              <div className="group w-full max-w-[350px] rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF] p-6 sm:p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(59,130,246,0.15)] hover:border-[#CFE3FF] hover:bg-[#EAF2FF]">
                <div className="mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DFEAFF] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D3E4FF]">
                  <img
                    src="/images/div.svg"
                    alt="Address icon"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">
                  {t('address')}
                </h3>
                {loading ? (
                  <div className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                    <div className="space-y-2">
                      <div className="animate-pulse bg-gray-200 rounded h-4 w-40 mx-auto"></div>
                      <div className="animate-pulse bg-gray-200 rounded h-4 w-32 mx-auto"></div>
                      <div className="animate-pulse bg-gray-200 rounded h-4 w-36 mx-auto"></div>
                    </div>
                  </div>
                ) : (() => {
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
                      className="mt-2 inline-block text-[14px] sm:text-[16px] font-[Poppins] text-[#334155] hover:text-[#0f172a] transition-colors"
                    >
                      {(contactData?.[`address_line1_${language}`] ||
                        contactData?.address_line1_en ||
                        contactData?.address_line1) && (
                        <p>
                          {contactData?.[`address_line1_${language}`] ||
                            contactData?.address_line1_en ||
                            contactData?.address_line1}
                        </p>
                      )}
                      {(contactData?.[`address_line2_${language}`] ||
                        contactData?.address_line2_en ||
                        contactData?.address_line2) && (
                        <p>
                          {contactData?.[`address_line2_${language}`] ||
                            contactData?.address_line2_en ||
                            contactData?.address_line2}
                        </p>
                      )}
                      {(contactData?.city || contactData?.country) && (
                        <p>
                          {contactData?.city && contactData?.country
                            ? `${contactData.city}, ${contactData.country}`
                            : contactData?.city || contactData?.country}
                        </p>
                      )}
                    </a>
                  ) : (
                    <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                      {t('address')}
                    </p>
                  );
                })()}
              </div>

              {/* Email Us */}
              <div className="group w-full max-w-[350px] rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF] p-6 sm:p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(59,130,246,0.15)] hover:border-[#CFE3FF] hover:bg-[#EAF2FF]">
                <div className="mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DFEAFF] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D3E4FF]">
                  <img
                    src="/images/emailas.png"
                    alt="Email icon"
                    className="w-15 h-15 sm:w-15 sm:h-15"
                  />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">
                  {t('emailUs')}
                </h3>
                {loading ? (
                  <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                    <div className="animate-pulse bg-gray-200 rounded h-5 w-48 mx-auto"></div>
                  </p>
                ) : contactData?.email ? (
                  <a
                    href={`mailto:${contactData.email}`}
                    className="mt-2 inline-block text-[14px] sm:text-[16px] font-[Poppins] text-[#334155] hover:text-[#0f172a] transition-colors break-all"
                  >
                    {contactData.email}
                  </a>
                ) : (
                  <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                    {t('emailAddress')}
                  </p>
                )}
                <p className="mt-1 text-[12px] sm:text-[14px] font-[Poppins] text-[#64748b]">
                  {t('weRespondSoon')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default QuestionsContact;
