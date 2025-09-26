// src/components/payment/PaymentSelector.jsx
import React, { useEffect, useState } from 'react';
import StripePayment from './StripePayment';
import PayPalPayment from './PayPalPayment';
import FondyPayment from './FondyPayment';

const PaymentSelector = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
  initialMethod = 'stripe',   // ✅ НОВОЕ: начальный способ оплаты
}) => {
  const [selectedMethod, setSelectedMethod] = useState(initialMethod);

  // если родитель сменил initialMethod — синхронизируем
  useEffect(() => {
    setSelectedMethod(initialMethod);
  }, [initialMethod]);

  const paymentMethods = [
    { id: 'stripe', name: 'Stripe',  description: 'Modern UI, supports multiple currencies worldwide', icon: '/images/stripe1.svg' },
    { id: 'paypal', name: 'PayPal',  description: 'Trusted brand, simple setup, widely recognized',   icon: '/images/i.svg' },
    { id: 'fondy',  name: 'Fondy',   description: 'Perfect for Poland, Ukraine, Eastern Europe',      icon: '/images/fondy.svg' },
  ];

  const handlePaymentSuccess = (result) =>
    onSuccess?.({ ...result, paymentMethod: selectedMethod });

  const handlePaymentError = (error) =>
    onError?.({ error, paymentMethod: selectedMethod });

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'stripe':
        return <StripePayment amount={amount} currency={currency} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />;
      case 'paypal':
        return <PayPalPayment amount={amount} currency={currency} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />;
      case 'fondy':
        return <FondyPayment  amount={amount} currency={currency} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-global-1 mb-4">Choose Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedMethod === m.id ? 'border-global-1 bg-global-3 shadow-md' : 'border-gray-200 bg-white hover:border-global-2 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center mb-2">
                <img src={m.icon} alt={m.name} className="w-6 h-5 mr-2" />
                <span className="font-medium text-global-1">{m.name}</span>
              </div>
              <p className="text-sm text-global-4">{m.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-global-1 mb-4">Complete Your Donation</h3>
        {renderPaymentForm()}
      </div>
    </div>
  );
};

export default PaymentSelector;
