import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLanguage } from '../../context/LanguageContext';

const PayPalPayment = ({ amount, currency = 'USD', onSuccess, onError }) => {
  const { t } = useLanguage();

  const initialOptions = {
    'client-id': 'your_paypal_client_id_here', // TODO: замените на реальный ID
    currency,
    intent: 'capture',
  };

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: { value: amount.toString(), currency_code: currency },
          description: t('donationOrderDescription'),
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
          <h3 className="text-lg font-semibold text-global-1">
            {t('paymentPayWithPayPal')}
          </h3>
        </div>

        <p className="text-sm text-global-4">
          {t('paymentPayPalLongDesc')}
        </p>

        <p className="text-sm text-global-4 mt-2 mb-4">
          {t('paymentDonateVia')}{' '}
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
