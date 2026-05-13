import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { termsOfServiceService } from '../services/termsOfServiceService';

const TermsOfServiceContext = createContext();

export const useTermsOfService = () => {
  const context = useContext(TermsOfServiceContext);
  if (!context) {
    throw new Error('useTermsOfService must be used within a TermsOfServiceProvider');
  }
  return context;
};

export const TermsOfServiceProvider = ({ children }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await termsOfServiceService.get();
      setPageData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading terms of service:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (payload) => {
    try {
      setError(null);
      const updated = await termsOfServiceService.update(payload);
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
    <TermsOfServiceContext.Provider value={value}>{children}</TermsOfServiceContext.Provider>
  );
};
