import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Button from '../ui/Button';

// Initialize Stripe (you'll need to replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here');

const CheckoutForm = ({ amount, currency = 'usd', onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        onError && onError(error);
        setIsProcessing(false);
        return;
      }

      // Here you would typically send the payment method to your backend
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        onSuccess && onSuccess({
          paymentMethod: paymentMethod,
          amount: amount,
          currency: currency
        });
        setIsProcessing(false);
      }, 2000);

    } catch (err) {
      onError && onError(err);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : `Donate $${amount}`}
      </Button>
    </form>
  );
};

const StripePayment = ({ amount, currency, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <img 
            src="/images/img_frame.svg" 
            alt="Stripe" 
            className="w-8 h-6 mr-2"
          />
          <h3 className="text-lg font-semibold text-global-1">Pay with Stripe</h3>
        </div>
        <p className="text-sm text-global-4 mb-4">
          Secure payment processing with support for multiple currencies
        </p>
        <CheckoutForm 
          amount={amount} 
          currency={currency}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </Elements>
  );
};

export default StripePayment;