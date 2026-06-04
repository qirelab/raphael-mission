import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { testimoniesHeroService } from '../services/testimoniesHeroService';

const TestimoniesHeroContext = createContext();

export const useTestimoniesHero = () => {
  const context = useContext(TestimoniesHeroContext);
  if (!context) {
    throw new Error('useTestimoniesHero must be used within a TestimoniesHeroProvider');
  }
  return context;
};

export const TestimoniesHeroProvider = ({ children }) => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimoniesHeroService.get();
      setHeroData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading testimonies hero:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateHero = async (payload) => {
    try {
      setError(null);
      const updated = await testimoniesHeroService.update(payload);
      setHeroData(updated);
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
    heroData,
    loading,
    error,
    updateHero,
    refreshHero: load,
  };

  return (
    <TestimoniesHeroContext.Provider value={value}>{children}</TestimoniesHeroContext.Provider>
  );
};
