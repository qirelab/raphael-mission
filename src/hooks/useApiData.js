import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsService } from '../services/projectsService';
import { testimoniesService } from '../services/testimoniesService';
import { trainingService } from '../services/trainingService';
import { shopService } from '../services/shopService';
import { contactService } from '../services/contactService';

export const useProjects = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projects = await projectsService.getActive();
        const mapped = projects
          .filter((p) => p.is_active)
          .map((p) => ({
            id: p.id,
            title: p[`title_${language}`] || p.title_en,
            description: p[`description_${language}`] || p.description_en,
            image: p.image_url,
            link: `/projects/${p.slug}`,
            slug: p.slug,
          }));
        setData(mapped);
      } catch (err) {
        setError(err);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { data, loading, error };
};

export const useTestimonies = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const testimonies = await testimoniesService.getActive();
        const mapped = testimonies
          .filter((t) => t.is_active)
          .map((t) => ({
            id: t.id,
            name: t.name,
            location: t.location || '',
            testimony: t[`testimony_${language}`] || t.testimony_en,
            image_url: t.image_url,
          }));
        setData(mapped);
      } catch (err) {
        setError(err);
        console.error('Error fetching testimonies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { data, loading, error };
};

export const useTrainingPrograms = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const programs = await trainingService.getActive();
        const mapped = programs
          .filter((p) => p.is_active)
          .map((p) => ({
            id: p.id,
            title: p[`title_${language}`] || p.title_en,
            description: p[`description_${language}`] || p.description_en,
            duration: p[`duration_${language}`] || p.duration_en || '',
            image_url: p.image_url,
          }));
        setData(mapped);
      } catch (err) {
        setError(err);
        console.error('Error fetching training programs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { data, loading, error };
};

export const useProducts = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await shopService.getActive();
        const mapped = products
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
        setData(mapped);
      } catch (err) {
        setError(err);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { data, loading, error };
};

export const useContactInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchData();
  }, []);

  return { data, loading, error };
};
