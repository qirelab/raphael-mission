import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ amount, currency = 'USD', onSuccess, onError }) => {
  const initialOptions = {
    'client-id': 'your_paypal_client_id_here', // <-- замени на реальный
    currency,
    intent: 'capture',
  };

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: { value: amount.toString(), currency_code: currency },
          description: 'Donation to Raphael Mission',
        },
      ],
    });

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      onSuccess?.({
        orderId: data.orderID,
        payerId: data.payerID,
        details,
        amount,
        currency,
      });
    } catch (e) {
      onError?.(e);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-3">
          <img
            src="/images/i.svg"
            alt="PayPal"
            className="w-8 h-6 mr-2"
          />
          <h3 className="text-lg font-semibold text-global-1">Pay with PayPal</h3>
        </div>

        <p className="text-sm text-global-4">
          Trusted by millions worldwide. Pay securely with your PayPal account or credit card.
        </p>

        {/* ССЫЛКА — ТОЛЬКО ДЛЯ PAYPAL */}
        <p className="text-sm text-global-4 mt-2 mb-4">
          Donate via{' '}
          <a
            href="https://paypal.me/Raphaelmission"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            paypal.me/Raphaelmission
          </a>
          .
        </p>

        <PayPalButtons
          style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'donate' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => onError?.(err)}
          onCancel={() => console.log('PayPal payment cancelled')}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
