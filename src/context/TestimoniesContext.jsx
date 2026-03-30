import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { testimoniesService } from '../services/testimoniesService';

const TestimoniesContext = createContext();

export const useTestimoniesContext = () => {
  const context = useContext(TestimoniesContext);
  if (!context) {
    throw new Error('useTestimoniesContext must be used within TestimoniesProvider');
  }
  return context;
};

export const TestimoniesProvider = ({ children }) => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  // Load testimonies only once on mount
  useEffect(() => {
    // Prevent duplicate fetches from React.StrictMode
    if (isFetching.current) return;
    isFetching.current = true;

    const loadTestimonies = async () => {
      try {
        setLoading(true);
        const data = await testimoniesService.getActive();
        setTestimonies(data);
        setError(null);
      } catch (err) {
        console.error('Error loading testimonies:', err);
        setError(err);
        setTestimonies([]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonies().finally(() => {
      isFetching.current = false;
    });
  }, []); // Load only once!

  // Refresh testimonies (for admin panel after create/update/delete)
  const refreshTestimonies = async () => {
    try {
      const data = await testimoniesService.getActive();
      setTestimonies(data);
    } catch (err) {
      console.error('Error refreshing testimonies:', err);
    }
  };

  return (
    <TestimoniesContext.Provider value={{ testimonies, loading, error, refreshTestimonies }}>
      {children}
    </TestimoniesContext.Provider>
  );
};
