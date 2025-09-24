import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import PaymentSelector from '../../components/payment/PaymentSelector';
import { useLanguage } from '../../context/LanguageContext';

const DonationPage = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const FIXED_AMOUNT = 25;
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'error' | null
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // какой провайдер открыть

  // Чтение query-параметра method при загрузке
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const method = params.get('method');
    if (['paypal', 'stripe', 'fondy'].includes(method)) {
      setPaymentMethod(method);
      setShowPayment(true);
    }
  }, [location.search]);

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

      {/* HERO + выбор оплаты */}
      <div className="w-full bg-global-4">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            {/* Левый столбец: заголовок/описание/выбор метода */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-inter font-bold leading-tight text-global-1">
                {t('donationPageTitle')}
              </h1>
              <p className="mt-3 text-[16px] sm:text-[18px] lg:text-[20px] font-inter text-global-4 max-w-[720px]">
                {t('donationPageDescription')}
              </p>

              {/* Карточка с логотипами */}
              <div className="mt-6 bg-global-4 border border-global-2 rounded-[16px] p-6 shadow-[0px_20px_25px_#00000019]">
                {!showPayment ? (
                  <div className="flex justify-center items-center gap-10 sm:gap-12">
                    <button
                      type="button"
                      onClick={() => { setPaymentMethod('stripe'); setShowPayment(true); }}
                      className="opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      title="Stripe"
                      aria-label="Pay with Stripe"
                    >
                      <img src="/images/stripe.svg" alt="Stripe" className="w-[72px] h-[44px]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => { setPaymentMethod('paypal'); setShowPayment(true); }}
                      className="opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      title="PayPal"
                      aria-label="Pay with PayPal"
                    >
                      <img src="/images/payp.svg" alt="PayPal" className="w-[62px] h-[44px]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => { setPaymentMethod('fondy'); setShowPayment(true); }}
                      className="opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      title="Fondy"
                      aria-label="Pay with Fondy"
                    >
                      <img src="/images/stripe1.svg" alt="Fondy" className="w-[66px] h-[44px]" />
                    </button>
                  </div>
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
                          <h4 className="text-green-800 font-medium">{t('paymentSuccessful')}</h4>
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
                        initialMethod={paymentMethod}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Правый столбец: картинка */}
            <div className="w-full lg:w-1/2">
              <img
                src="/images/money .jpg"
                alt="Mission impact"
                className="w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[520px] object-cover rounded-[12px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ПРЕЖНИЙ ПОЛНЫЙ ФУТЕР */}
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
                  <a href="http://localhost:4028/about-mission" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('about')}</a>
                  <a href="http://localhost:4028/projects" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('projects')}</a>
                  <a href="http://localhost:4028/fund" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('fund')}</a>
                  <a href="http://localhost:4028/testimonies" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('testimonies')}</a>
                  <a href="http://localhost:4028/training" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('training')}</a>
                  <a href="http://localhost:4028/story" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('story')}</a>
                  <a href="http://localhost:4028/shop" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('shop')}</a>
                  <a href="http://localhost:4028/questions-contact" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('contact')}</a>
                  <a href="http://localhost:4028/donation" className="block text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">{t('donate')}</a>
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
