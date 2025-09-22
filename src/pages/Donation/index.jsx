import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import PaymentSelector from '../../components/payment/PaymentSelector';
import { useLanguage } from '../../context/LanguageContext';

const DonationPage = () => {
  const { t } = useLanguage();

  // фиксированная сумма пожертвования (измени при необходимости)
  const FIXED_AMOUNT = 25;

  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'error' | null

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setPaymentStatus('success');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setPaymentStatus('error');
  };

  return (
    <div className="w-full bg-global-4">
      <Header />

      {/* Основной контент */}
      <div className="w-full bg-global-4">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Левая часть (герой) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-inter font-bold leading-[28px] sm:leading-[36px] md:leading-[44px] lg:leading-[48px] text-global-1">
                  {t('donationPageTitle')}
                </h1>
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[24px] sm:leading-[28px] lg:leading-[33px] text-global-4">
                  {t('donationPageDescription')}
                </p>
              </div>
              <div className="w-full">
                <img
                  src="/images/donat.png"
                  alt="Mission impact"
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-[16px]"
                />
              </div>
            </div>

            {/* Правая часть — только кнопка и платёж */}
            <div className="w-full lg:w-1/2 lg:self-center">
              <div className="bg-global-4 border border-global-2 rounded-[16px] p-6 sm:p-8 shadow-[0px_20px_25px_#00000019]">
                <div className="flex flex-col gap-6">
                  {!showPayment ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => setShowPayment(true)}
                        className="w-full bg-global-1 text-global-7 py-4 px-8 rounded-[8px] text-[18px] font-inter font-bold flex items-center justify-center gap-1"
                      >
                        {t('proceedToPayment')}
                      </Button>

                      <div className="flex justify-center items-end gap-4 py-2">
                        <img src="/images/stripe.svg" alt="payment method" className="w-[35px] h-[24px]" />
                        <img src="/images/paypal.svg" alt="payment method" className="w-[18px] h-[24px]" />
                        <img src="/images/fondy.svg" alt="payment method" className="w-[27px] h-[24px]" />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={() => { setShowPayment(false); setPaymentStatus(null); }}
                        className="text-global-2 hover:text-global-1 text-sm font-medium flex items-center gap-2"
                      >
                        ← {t('backToDonationDetails')}
                      </button>

                      {paymentStatus === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <h4 className="text-green-800 font-medium">{t('paymentSuccessful')}</h4>
                              <p className="text-green-700 text-sm">
                                {/* при желании можно вывести сумму */}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <h4 className="text-red-800 font-medium">{t('paymentFailed')}</h4>
                              <p className="text-red-700 text-sm">{t('paymentError')}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentStatus !== 'success' && (
                        <PaymentSelector
                          amount={FIXED_AMOUNT}
                          currency="USD"
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#333333] py-8 lg:py-10">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="w-full lg:w-[22%]">
              <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-white font-['Poppins'] mb-4">
                Raphael Mission
              </h3>
              <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] mb-6 max-w-[94%]">
                {t('footerDesc')}
              </p>
              <div className="flex items-center gap-3">
                <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px]" />
                <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px]" />
                <img src="/images/youtube.svg" alt="Instagram" className="w-[18px] h-[16px]" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Navigation */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('navigation')}
                </h4>
                <div className="space-y-2">
                  {['About', 'Projects', 'Fund', 'Testimonies', 'Training', 'Story', 'Shop', 'Contact', 'Donate'].map(
                    (item) => (
                      <p
                        key={item}
                        className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']"
                      >
                        {item}
                      </p>
                    ),
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="w-full lg:w-[48%]">
                <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                  {t('contact')}
                </h4>
                <div className="space-y-2 max-w-[84%]">
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    info@raphaelmission.org
                  </p>
                  <div>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      123 Mission Street
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
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('privacyPolicy')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('termsOfService')}
                  </p>
                  <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                    {t('cookiePolicy')}
                  </p>
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

export default DonationPage;
