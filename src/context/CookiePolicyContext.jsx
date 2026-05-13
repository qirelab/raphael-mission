import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cookiePolicyService } from '../services/cookiePolicyService';

const CookiePolicyContext = createContext();

export const useCookiePolicy = () => {
  const context = useContext(CookiePolicyContext);
  if (!context) {
    throw new Error('useCookiePolicy must be used within a CookiePolicyProvider');
  }
  return context;
};

export const CookiePolicyProvider = ({ children }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cookiePolicyService.get();
      setPageData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading cookie policy:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (payload) => {
    try {
      setError(null);
      const updated = await cookiePolicyService.update(payload);
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
    <CookiePolicyContext.Provider value={value}>{children}</CookiePolicyContext.Provider>
  );
};
