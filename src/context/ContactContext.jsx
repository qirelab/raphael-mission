import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { contactService } from '../services/contactService';

const ContactContext = createContext();

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  // Simple function to load contact data
  const loadContactData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await contactService.get();
      setContactData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading contact data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Simple function to update contact data with immediate refresh
  const updateContactData = async (newData) => {
    try {
      setError(null);

      const updatedData = await contactService.update(newData);

      // Immediately update local state
      setContactData(updatedData);

      return updatedData;
    } catch (err) {
      setError(err.message);
      console.error('Error updating contact data:', err);
      throw err;
    }
  };

  // Load data on mount
  useEffect(() => {
    // Prevent duplicate fetches from React.StrictMode
    if (isFetching.current) return;
    isFetching.current = true;

    loadContactData().finally(() => {
      isFetching.current = false;
    });
  }, []);

  const value = {
    contactData,
    loading,
    error,
    updateContactData,
    refreshData: loadContactData,
  };

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};
