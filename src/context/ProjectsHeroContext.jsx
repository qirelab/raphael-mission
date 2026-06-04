import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { projectsHeroService } from '../services/projectsHeroService';

const ProjectsHeroContext = createContext();

export const useProjectsHero = () => {
  const context = useContext(ProjectsHeroContext);
  if (!context) {
    throw new Error('useProjectsHero must be used within a ProjectsHeroProvider');
  }
  return context;
};

export const ProjectsHeroProvider = ({ children }) => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsHeroService.get();
      setHeroData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading projects hero:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateHero = async (payload) => {
    try {
      setError(null);
      const updated = await projectsHeroService.update(payload);
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
    <ProjectsHeroContext.Provider value={value}>{children}</ProjectsHeroContext.Provider>
  );
};
