import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { privacyPolicyService } from '../services/privacyPolicyService';

const PrivacyPolicyContext = createContext();

export const usePrivacyPolicy = () => {
  const context = useContext(PrivacyPolicyContext);
  if (!context) {
    throw new Error('usePrivacyPolicy must be used within a PrivacyPolicyProvider');
  }
  return context;
};

export const PrivacyPolicyProvider = ({ children }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await privacyPolicyService.get();
      setPageData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading privacy policy:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (payload) => {
    try {
      setError(null);
      const updated = await privacyPolicyService.update(payload);
      setPageData(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    load().finally(() => {
      isFetching.current = false;
    });
  }, []);

  const value = {
    pageData,
    loading,
    error,
    updatePage,
    refreshPage: load,
  };

  return (
    <PrivacyPolicyContext.Provider value={value}>{children}</PrivacyPolicyContext.Provider>
  );
};
