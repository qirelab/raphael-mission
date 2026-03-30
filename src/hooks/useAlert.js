import { useAlert as useAlertContext } from '../context/AlertContext';

export const useAlert = () => {
  const alertContext = useAlertContext();

  return {
    ...alertContext,
    // Additional convenience methods
    success: alertContext.showSuccess,
    error: alertContext.showError,
    warning: alertContext.showWarning,
    info: alertContext.showInfo,
  };
};




