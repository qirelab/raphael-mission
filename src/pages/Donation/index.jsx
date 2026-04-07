import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PaymentSelector from '../../components/payment/PaymentSelector';
import { useLanguage } from '../../context/LanguageContext';
import Footer from '../../components/common/Footer';
import { DonationSkeleton } from '../../components/skeletons';

const DonationPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const FIXED_AMOUNT = 25;
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'error' | null
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // какой провайдер открыть

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Чтение query-параметра method при загрузке
  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className="w-full bg-white">
        <DonationSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-global-4">
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
                      onClick={() => {
                        setPaymentMethod('stripe');
                        setShowPayment(true);
                      }}
                      className="opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      title="Stripe"
                      aria-label="Pay with Stripe"
                    >
                      <img src="/images/stripe1.svg" alt="Stripe" className="w-[72px] h-[44px]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('paypal');
                        setShowPayment(true);
                      }}
                      className="opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      title="PayPal"
                      aria-label="Pay with PayPal"
                    >
                      <img src="/images/payp.svg" alt="PayPal" className="w-[62px] h-[44px]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('fondy');
                        setShowPayment(true);
                      }}
                      className="opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      title="Fondy"
                      aria-label="Pay with Fondy"
                    >
                      <img src="/images/fondy.svg" alt="Fondy" className="w-[66px] h-[44px]" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setShowPayment(false);
                        setPaymentStatus(null);
                      }}
                      className="text-global-2 hover:text-global-1 text-sm font-medium flex items-center gap-2"
                    >
                      ← {t('backToDonationDetails')}
                    </button>

                    {paymentStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-green-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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
                          <svg
                            className="w-5 h-5 text-red-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/images/money.jpg"
                alt="Mission impact"
                className="
                  block w-full h-auto
                  max-h-[220px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[420px]
                  object-contain rounded-[12px]
                  shadow-none drop-shadow-none filter-none
                "
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DonationPage;
