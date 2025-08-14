import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import Dropdown from '../../components/ui.donation/Dropdown';
import PaymentSelector from '../../components/payment/PaymentSelector';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('once');
  const [selectedCategory, setSelectedCategory] = useState('most-needed');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'error', null

  const donationOptions = [
    { value: 'most-needed', label: 'Most Needed' },
    { value: 'clean-water', label: 'Clean Water' },
    { value: 'medical-supplies', label: 'Medical Supplies' },
    { value: 'community-programs', label: 'Community Programs' },
    { value: 'emergency-relief', label: 'Emergency Relief' }
  ];

  const presetAmounts = [25, 50, 100, 250];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getTotalAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseInt(customAmount);
    return 0;
  };

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setPaymentStatus('success');
    // Here you could send the donation data to your backend
    // Reset form or redirect to success page
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setPaymentStatus('error');
  };

  const handleProceedToPayment = () => {
    const amount = getTotalAmount();
    if (amount > 0) {
      setShowPayment(true);
    }
  };

  return (
    <div className="w-full bg-global-4">
      <Header />
      {/* Main Content */}
      <div className="w-full bg-global-4">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">

            {/* Left Section - Hero Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-inter font-bold leading-[28px] sm:leading-[36px] md:leading-[44px] lg:leading-[48px] text-global-1">
                  Advance the Mission Through Your Gift
                </h1>
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[24px] sm:leading-[28px] lg:leading-[33px] text-global-4">
                  100% of your donation goes directly to humanitarian aid, healthcare, and faith-based outreach.
                </p>
              </div>

              <div className="w-full">
                <img 
                  src="/images/img_img.png" 
                  alt="Mission impact" 
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-[16px]"
                />
              </div>
            </div>

            {/* Right Section - Donation Form */}
            <div className="w-full lg:w-1/2 lg:self-center">
              <div className="bg-global-4 border border-global-2 rounded-[16px] p-6 sm:p-8 shadow-[0px_20px_25px_#00000019]">
                <div className="flex flex-col gap-6">

                  {/* Form Title */}
                  <h2 className="text-[20px] sm:text-[24px] font-inter font-bold leading-[24px] sm:leading-[30px] text-global-1">
                    Choose an Amount to Give
                  </h2>

                  {/* Category Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-inter font-medium leading-[17px] text-global-3">
                      Where should your gift go?
                    </label>
                    <Dropdown
                      options={donationOptions}
                      value={selectedCategory}
                      onChange={(option) => setSelectedCategory(option?.value)}
                      placeholder="Most Needed"
                      rightIcon={{
                        src: "/images/img_arrow_down.svg",
                        width: 32,
                        height: 32
                      }}
                      className="w-full"
                    />
                  </div>

                  {/* Donation Type Toggle */}
                  <div className="bg-global-2 rounded-[8px] p-1.5">
                    <div className="flex">
                      <button
                        onClick={() => setDonationType('once')}
                        className={`flex-1 py-2 px-4 text-[14px] font-inter font-medium leading-[17px] rounded-[6px] transition-colors duration-200 ${
                          donationType === 'once' ?'bg-global-1 text-global-7' :'bg-transparent text-global-4'
                        }`}
                      >
                        Give Once
                      </button>
                      <button
                        onClick={() => setDonationType('monthly')}
                        className={`flex-1 py-2 px-4 text-[14px] font-inter font-medium leading-[17px] rounded-[6px] transition-colors duration-200 ${
                          donationType === 'monthly' ?'bg-global-1 text-global-7' :'bg-transparent text-global-4'
                        }`}
                      >
                        Give Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      {presetAmounts?.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`py-3 px-4 text-[18px] font-inter font-semibold leading-[22px] text-center rounded-[8px] border-2 transition-colors duration-200 ${
                            selectedAmount === amount
                              ? 'border-global-1 bg-global-1 text-global-7' :'border-[#d1d5db] bg-global-4 text-global-8 hover:border-global-1'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-inter font-medium leading-[17px] text-global-3">
                      Other amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px] font-inter font-normal leading-[20px] text-global-5">
                        $
                      </span>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 text-[16px] font-inter font-normal leading-[20px] bg-global-4 border border-[#d1d5db] rounded-[8px] text-global-6 placeholder-global-6 focus:outline-none focus:ring-2 focus:ring-global-1 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Total Display */}
                  <div className="bg-global-3 rounded-[8px] p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] font-inter font-medium leading-[22px] text-global-3">
                        Total:
                      </span>
                      <span className="text-[24px] font-inter font-bold leading-[30px] text-global-2">
                        ${getTotalAmount()}
                      </span>
                    </div>
                  </div>

                  {/* Payment Section */}
                  {!showPayment ? (
                    <>
                      {/* Next Button */}
                      <Button
                        variant="primary"
                        onClick={handleProceedToPayment}
                        disabled={getTotalAmount() === 0}
                        className="w-full bg-global-1 text-global-7 py-4 px-8 rounded-[8px] text-[18px] font-inter font-bold leading-[22px] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed to Payment
                        <img 
                          src="/images/img_i.svg" 
                          alt="arrow" 
                          className="w-[14px] h-[20px] ml-1"
                        />
                      </Button>

                      {/* Payment Icons */}
                      <div className="flex justify-center items-end gap-4 py-2">
                        <img 
                          src="/images/img_frame.svg" 
                          alt="payment method" 
                          className="w-[30px] h-[24px]"
                        />
                        <img 
                          src="/images/img_frame_blue_gray_100.svg" 
                          alt="payment method" 
                          className="w-[18px] h-[24px]"
                        />
                        <img 
                          src="/images/img_frame_blue_gray_100_16x14.svg" 
                          alt="payment method" 
                          className="w-[26px] h-[24px]"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {/* Back Button */}
                      <button
                        onClick={() => setShowPayment(false)}
                        className="text-global-2 hover:text-global-1 text-sm font-medium flex items-center gap-2"
                      >
                        ← Back to donation details
                      </button>

                      {/* Payment Status Messages */}
                      {paymentStatus === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <h4 className="text-green-800 font-medium">Payment Successful!</h4>
                              <p className="text-green-700 text-sm">Thank you for your generous donation of ${getTotalAmount()}.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <h4 className="text-red-800 font-medium">Payment Failed</h4>
                              <p className="text-red-700 text-sm">There was an issue processing your payment. Please try again.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payment Selector */}
                      {paymentStatus !== 'success' && (
                        <PaymentSelector
                          amount={getTotalAmount()}
                          currency="USD"
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      )}
                    </div>
                  )}

                  {/* Footer Links */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-center">
                    <button className="text-[14px] font-inter font-normal leading-[17px] text-global-2 hover:underline">
                      Is my gift secure?
                    </button>
                    <button className="text-[14px] font-inter font-normal leading-[17px] text-global-2 hover:underline">
                      Tax-deductible?
                    </button>
                    <button className="text-[14px] font-inter font-normal leading-[17px] text-global-2 hover:underline">
                      Other ways to give
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Impact Section */}
      <section className="w-full bg-global-1 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 sm:gap-16">

            {/* Section Header */}
            <div className="text-center px-4 sm:px-8 lg:px-14">
              <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-inter font-bold leading-[28px] sm:leading-[36px] lg:leading-[44px] text-global-7 mb-3">
                Your Impact
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[24px] sm:leading-[26px] lg:leading-[28px] text-global-7 max-w-2xl mx-auto">
                See how your donation makes a real difference in communities around the world.
              </p>
            </div>

            {/* Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {/* $25 Impact Card */}
              <div className="bg-global-4 rounded-[16px] p-6 sm:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center gap-4 sm:gap-5">
                <div className="flex justify-center items-center">
                  <img 
                    src="/images/img_div.svg" 
                    alt="water drop icon" 
                    className="w-[36px] h-[44px]"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-[24px] font-inter font-bold leading-[30px] text-global-2 mb-3">
                    $25
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-[16px] font-inter font-normal leading-[20px] text-global-3">
                    Clean water for a family of 5 for one
                  </p>
                  <p className="text-[16px] font-inter font-normal leading-[20px] text-global-3">
                    month
                  </p>
                </div>
              </div>

              {/* $50 Impact Card */}
              <div className="bg-global-4 rounded-[16px] p-6 sm:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center gap-4 sm:gap-5">
                <div className="flex justify-center items-center">
                  <img 
                    src="/images/img_vector.svg" 
                    alt="medical supplies icon" 
                    className="w-[36px] h-[44px]"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-[24px] font-inter font-bold leading-[30px] text-global-2 mb-3">
                    $50
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-[16px] font-inter font-normal leading-[20px] text-global-3">
                    Medical supplies for mobile clinics
                  </p>
                </div>
              </div>

              {/* $100 Impact Card */}
              <div className="bg-global-4 rounded-[16px] p-6 sm:p-8 shadow-[0px_10px_15px_#00000019] flex flex-col items-center gap-4 sm:gap-5">
                <div className="flex justify-center items-center">
                  <img 
                    src="/images/img_i_orange_900.svg" 
                    alt="community center icon" 
                    className="w-[36px] h-[44px]"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-[24px] font-inter font-bold leading-[30px] text-global-2 mb-3">
                    $100
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-[16px] font-inter font-normal leading-[20px] text-global-3">
                    Community center programs for children
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
