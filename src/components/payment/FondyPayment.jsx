import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FondyPayment = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center mb-3">
        <img
          src="/images/fondy.svg"
          alt="Fondy"
          className="w-8 h-6 mr-2"
        />
        <h3 className="text-lg font-semibold text-global-1">
          {t('paymentPayWithFondy')}
        </h3>
      </div>

      <p className="text-sm text-global-4 mb-3">
        {t('paymentFondyLongDesc')}
      </p>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-global-1 mb-2">
          {t('paymentSupportedMethodsTitle')}
        </h4>
        <ul className="text-sm text-global-4 space-y-1">
          <li>• {t('paymentMethodVisaMastercard')}</li>
          <li>• {t('paymentMethodLocalPolishBanks')}</li>
          <li>• {t('paymentMethodBLIKPoland')}</li>
          <li>
            • {t('paymentMethodBankTransfers')}
            <br />
            <span className="ml-4">
              {t('paymentDonateVia')}{' '}
              <a
                href="https://pay.fondy.eu/s/xeUJsd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                https://pay.fondy.eu/s/xeUJsd
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FondyPayment;
