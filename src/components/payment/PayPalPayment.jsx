import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ amount, currency = 'USD', onSuccess, onError }) => {
  const initialOptions = {
    'client-id': 'your_paypal_client_id_here', // Replace with your PayPal client ID
    currency: currency,
    intent: 'capture',
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: currency,
          },
          description: 'Donation to Raphael Mission',
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      onSuccess && onSuccess({
        orderId: data.orderID,
        payerId: data.payerID,
        details: details,
        amount: amount,
        currency: currency
      });
    } catch (error) {
      onError && onError(error);
    }
  };

  const onErrorHandler = (error) => {
    onError && onError(error);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <img 
            src="/images/img_frame_blue_gray_100.svg" 
            alt="PayPal" 
            className="w-8 h-6 mr-2"
          />
          <h3 className="text-lg font-semibold text-global-1">Pay with PayPal</h3>
        </div>
        <p className="text-sm text-global-4 mb-4">
          Trusted by millions worldwide. Pay securely with your PayPal account or credit card.
        </p>
        <div className="paypal-button-container">
          <PayPalButtons
            style={{
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'donate',
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onErrorHandler}
            onCancel={() => {
              console.log('PayPal payment cancelled');
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;