import React, { useState } from 'react';
import StripePayment from './StripePayment';
import PayPalPayment from './PayPalPayment';
import FondyPayment from './FondyPayment';

const PaymentSelector = ({ amount, currency = 'USD', onSuccess, onError }) => {
  const [selectedMethod, setSelectedMethod] = useState('stripe');

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Modern UI, supports multiple currencies worldwide',
      icon: '/images/img_frame.svg',
      recommended: 'Global',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Trusted brand, simple setup, widely recognized',
      icon: '/images/img_frame_blue_gray_100.svg',
      recommended: 'Trusted',
    },
    {
      id: 'fondy',
      name: 'Fondy',
      description: 'Perfect for Poland, Ukraine, Eastern Europe',
      icon: '/images/img_frame_blue_gray_100_16x14.svg',
      recommended: 'Local',
    },
  ];

  const handlePaymentSuccess = (result) => {
    onSuccess && onSuccess({
      ...result,
      paymentMethod: selectedMethod,
    });
  };

  const handlePaymentError = (error) => {
    onError && onError({
      error,
      paymentMethod: selectedMethod,
    });
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'stripe':
        return (
          <StripePayment
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      case 'paypal':
        return (
          <PayPalPayment
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      case 'fondy':
        return (
          <FondyPayment
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-global-1 mb-4">
          Choose Payment Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${selectedMethod === method.id
                  ? 'border-global-1 bg-global-3 shadow-md'
                  : 'border-gray-200 bg-white hover:border-global-2 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center mb-2">
                <img
                  src={method.icon}
                  alt={method.name}
                  className="w-6 h-5 mr-2"
                />
                <span className="font-medium text-global-1">{method.name}</span>
                <span className="ml-auto text-xs bg-global-1 text-white px-2 py-1 rounded">
                  {method.recommended}
                </span>
              </div>
              <p className="text-sm text-global-4">{method.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Payment Form */}
      <div>
        <h3 className="text-lg font-semibold text-global-1 mb-4">
          Complete Your Donation
        </h3>
        {renderPaymentForm()}
      </div>

      {/* Security Notice */}
      <div className="bg-global-3 p-4 rounded-lg">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-global-1 mr-2 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="font-medium text-global-1 mb-1">Secure Payment</h4>
            <p className="text-sm text-global-4">
              All payments are processed securely using industry-standard encryption.
              Your financial information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelector;