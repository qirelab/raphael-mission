import React from 'react';

const StripePayment = () => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center mb-4">
        <img 
          src="/images/stripe.svg" 
          alt="Stripe" 
          className="w-8 h-6 mr-2"
        />
        <h3 className="text-lg font-semibold text-global-1">Pay with Stripe</h3>
      </div>
      <p className="text-sm text-global-4 mb-4">
        Secure payment processing with support for multiple currencies.
      </p>
      <p className="text-sm text-global-4">
        Donate via{' '}
        <a
          href="https://buy.stripe.com/test_cNidRb2vn7vK2v1eAI4Vy00"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Stripe Payment Link
        </a>
      </p>
    </div>
  );
};

export default StripePayment;
