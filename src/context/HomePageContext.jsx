import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { homePageService } from '../services/homePageService';

const HomePageContext = createContext();

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error('useHomePage must be used within a HomePageProvider');
  }
  return context;
};

export const HomePageProvider = ({ children }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await homePageService.get();
      setPageData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading home page:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (payload) => {
    try {
      setError(null);
      const updated = await homePageService.update(payload);
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

  return <HomePageContext.Provider value={value}>{children}</HomePageContext.Provider>;
};
