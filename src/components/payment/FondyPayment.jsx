import React, { useState } from 'react';
import Button from '../ui/Button';

const FondyPayment = ({ amount, currency = 'USD', onSuccess, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFondyPayment = async () => {
    setIsProcessing(true);

    try {
      // Fondy checkout configuration
      const fondyConfig = {
        merchant_id: 'your_fondy_merchant_id_here', // Replace with your Fondy merchant ID
        order_id: `donation_${Date.now()}`,
        order_desc: 'Donation to Raphael Mission',
        amount: Math.round(amount * 100), // Fondy expects amount in cents
        currency: currency,
        response_url: window.location.origin + '/donation/success',
        server_callback_url: window.location.origin + '/api/fondy/callback',
        sender_email: '', // Will be filled by user
        lang: 'en', // Can be changed to 'pl' for Polish
        product_id: 'donation',
        lifetime: 36000, // 10 hours
      };

      // In a real implementation, you would:
      // 1. Send this data to your backend
      // 2. Your backend would generate a signature and create the checkout
      // 3. Redirect user to Fondy checkout page
      
      // For demo purposes, we'll simulate the process
      const fondyCheckoutUrl = `https://pay.fondy.eu/merchants/${fondyConfig.merchant_id}/default/index.html`;
      
      // Create a form and submit it to Fondy
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = fondyCheckoutUrl;
      form.target = '_blank';

      // Add form fields
      Object.keys(fondyConfig).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fondyConfig[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      
      // For demo, we'll simulate success after a delay
      setTimeout(() => {
        onSuccess && onSuccess({
          orderId: fondyConfig.order_id,
          amount: amount,
          currency: currency,
          provider: 'fondy'
        });
        setIsProcessing(false);
        document.body.removeChild(form);
      }, 2000);

      // In real implementation, uncomment this to redirect to Fondy:
      // form.submit();

    } catch (error) {
      onError && onError(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center mb-4">
        <img 
          src="/images/img_frame_blue_gray_100_16x14.svg" 
          alt="Fondy" 
          className="w-8 h-6 mr-2"
        />
        <h3 className="text-lg font-semibold text-global-1">Pay with Fondy</h3>
      </div>
      <p className="text-sm text-global-4 mb-4">
        Perfect for Eastern European donors. Supports local banking and multiple languages including Polish.
      </p>
      
      <div className="space-y-4">
        <div className="bg-global-3 p-3 rounded-lg">
          <h4 className="font-medium text-global-1 mb-2">Supported Payment Methods:</h4>
          <ul className="text-sm text-global-4 space-y-1">
            <li>• Visa, Mastercard, Maestro</li>
            <li>• Local Polish banks</li>
            <li>• BLIK (Poland)</li>
            <li>• Bank transfers</li>
          </ul>
        </div>

        <Button
          onClick={handleFondyPayment}
          disabled={isProcessing}
          className="w-full bg-global-1 text-white hover:bg-opacity-90"
        >
          {isProcessing ? 'Redirecting to Fondy...' : `Donate $${amount} via Fondy`}
        </Button>

        <p className="text-xs text-global-5 text-center">
          You will be redirected to Fondy's secure payment page
        </p>
      </div>
    </div>
  );
};

export default FondyPayment;