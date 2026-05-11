import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { aboutService } from '../services/aboutService';

const AboutContext = createContext();

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
};

export const AboutProvider = ({ children }) => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const loadAbout = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await aboutService.get();
      setAboutData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading about page:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateAbout = async (payload) => {
    try {
      setError(null);
      const updated = await aboutService.update(payload);
      setAboutData(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    loadAbout().finally(() => {
      isFetching.current = false;
    });
  }, []);

  const value = {
    aboutData,
    loading,
    error,
    updateAbout,
    refreshAbout: loadAbout,
  };

  return <AboutContext.Provider value={value}>{children}</AboutContext.Provider>;
};
