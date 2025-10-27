import React from 'react';
import { useAlert } from '../hooks/useAlert';

const AlertDemo = () => {
  const { success, error, warning, info } = useAlert();

  const handleSuccess = () => {
    success('Операция выполнена успешно!', 'Успех');
  };

  const handleError = () => {
    error('Произошла ошибка при выполнении операции', 'Ошибка');
  };

  const handleWarning = () => {
    warning('Внимание! Проверьте введенные данные', 'Предупреждение');
  };

  const handleInfo = () => {
    info('Полезная информация для пользователя', 'Информация');
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Alert Demo</h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSuccess}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Success Alert
        </button>

        <button
          onClick={handleError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Error Alert
        </button>

        <button
          onClick={handleWarning}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Warning Alert
        </button>

        <button
          onClick={handleInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Info Alert
        </button>
      </div>
    </div>
  );
};

export default AlertDemo;




