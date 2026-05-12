import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { shopHeroService } from '../services/shopHeroService';

const ShopHeroContext = createContext();

export const useShopHero = () => {
  const context = useContext(ShopHeroContext);
  if (!context) {
    throw new Error('useShopHero must be used within a ShopHeroProvider');
  }
  return context;
};

export const ShopHeroProvider = ({ children }) => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopHeroService.get();
      setHeroData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading shop hero:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateHero = async (payload) => {
    try {
      setError(null);
      const updated = await shopHeroService.update(payload);
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
    <ShopHeroContext.Provider value={value}>{children}</ShopHeroContext.Provider>
  );
};
