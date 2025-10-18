import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLanguage } from './LanguageContext';
import Alert from '../components/ui/Alert';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((alert) => {
    const id = Date.now() + Math.random();
    const newAlert = {
      id,
      type: 'info',
      duration: 5000,
      ...alert,
    };

    setAlerts((prev) => [...prev, newAlert]);

    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (message, title = 'Success', options = {}) => {
      return addAlert({
        type: 'success',
        title,
        message,
        ...options,
      });
    },
    [addAlert]
  );

  const showError = useCallback(
    (message, title = 'Error', options = {}) => {
      return addAlert({
        type: 'error',
        title,
        message,
        duration: 7000, // Longer duration for errors
        ...options,
      });
    },
    [addAlert]
  );

  const showWarning = useCallback(
    (message, title = 'Warning', options = {}) => {
      return addAlert({
        type: 'warning',
        title,
        message,
        ...options,
      });
    },
    [addAlert]
  );

  const showInfo = useCallback(
    (message, title = 'Info', options = {}) => {
      return addAlert({
        type: 'info',
        title,
        message,
        ...options,
      });
    },
    [addAlert]
  );

  const value = {
    alerts,
    addAlert,
    removeAlert,
    clearAllAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}

      {/* Render all alerts */}
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          duration={alert.duration}
          onClose={() => removeAlert(alert.id)}
          show={true}
          t={t}
        />
      ))}
    </AlertContext.Provider>
  );
};
