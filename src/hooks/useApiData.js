import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsService } from '../services/projectsService';
import { testimoniesService } from '../services/testimoniesService';
import { trainingService } from '../services/trainingService';
import { shopService } from '../services/shopService';
import { contactService } from '../services/contactService';

// DEPRECATED: Use useProjects from ProjectsContext instead
// This hook is kept for backward compatibility but now uses ProjectsContext
export const useProjects = () => {
  console.warn('useProjects from useApiData is deprecated. Use useProjects from ProjectsContext instead.');
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load only once, not on language change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projects = await projectsService.getActive();
        setData(projects);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Load only once!

  // Transform data based on language (no API call)
  const mapped = data
    .filter((p) => p.is_active)
    .map((p) => ({
      id: p.id,
      title: p[`title_${language}`] || p.title_en,
      description: p[`description_${language}`] || p.description_en,
      image: p.image_url,
      link: `/${language}/projects/${p.slug}`,
      slug: p.slug,
    }));

  return { data: mapped, loading, error };
};

export const useTestimonies = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load only once, not on language change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const testimonies = await testimoniesService.getActive();
        setData(testimonies);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error fetching testimonies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Load only once!

  // Transform data based on language (no API call)
  const mapped = data.map((t) => ({
    id: t.id,
    name: t[`name_${language}`] || t.name_en || t.name,
    location: t[`title_${language}`] || t.title_en || '',
    testimony: t[`content_${language}`] || t.content_en,
    image: t.image_url,
  }));

  return { data: mapped, loading, error };
};

export const useTrainingPrograms = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load only once, not on language change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const programs = await trainingService.getActive();
        setData(programs);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error fetching training programs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Load only once!

  // Transform data based on language (no API call)
  const mapped = data
    .filter((p) => p.is_active)
    .map((p) => ({
      id: p.id,
      title: p[`title_${language}`] || p.title_en,
      description: p[`description_${language}`] || p.description_en,
      duration: p[`duration_${language}`] || p.duration_en || '',
      image: p.image_url,
    }));

  return { data: mapped, loading, error };
};

export const useProducts = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load only once, not on language change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await shopService.getActive();
        setData(products);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Load only once!

  // Transform data based on language (no API call)
  const mapped = data
    .filter((p) => p.is_active)
    .map((p) => ({
      id: p.id,
      name: p[`name_${language}`] || p.name_en,
      description: p[`description_${language}`] || p.description_en,
      price: p.price,
      currency: p.currency,
      image: p.image_url,
      inStock: p.stock_quantity > 0,
      stockQuantity: p.stock_quantity,
    }));

  return { data: mapped, loading, error };
};

export const useContactInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const contact = await contactService.get();
      setData(contact);
    } catch (err) {
      setError(err);
      console.error('Error fetching contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
