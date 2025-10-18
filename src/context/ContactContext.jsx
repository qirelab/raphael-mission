import React, { createContext, useContext, useState, useEffect } from 'react';
import { contactService } from '../services/contactService';
import { neonContactService } from '../services/neonContactService';
import { isUsingNeon } from '../config/database';

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

  // Simple function to load contact data
  const loadContactData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use appropriate service based on configuration
      const service = isUsingNeon() ? neonContactService : contactService;
      const data = await service.get();
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

      // Use appropriate service based on configuration
      const service = isUsingNeon() ? neonContactService : contactService;
      const updatedData = await service.update(newData);

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
    loadContactData();
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
