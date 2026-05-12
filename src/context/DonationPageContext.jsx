import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { donationPageService } from '../services/donationPageService';

const DonationPageContext = createContext();

export const useDonationPage = () => {
  const context = useContext(DonationPageContext);
  if (!context) {
    throw new Error('useDonationPage must be used within a DonationPageProvider');
  }
  return context;
};

export const DonationPageProvider = ({ children }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await donationPageService.get();
      setPageData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading donation page:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (payload) => {
    try {
      setError(null);
      const updated = await donationPageService.update(payload);
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
    <DonationPageContext.Provider value={value}>{children}</DonationPageContext.Provider>
  );
};
