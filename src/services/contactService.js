import { apiClient } from './apiClient.js';

// Simple, reliable contact service with immediate updates
export const contactService = {
  // Get contact info - simple and direct
  async get() {
    const response = await apiClient.get('/contact');
    return response.data;
  },

  // Update contact info - target the single existing record
  async update(contactData) {
    const response = await apiClient.put('/contact', contactData);
    return response.data;
  },

  // Delete all contact info (for admin use)
  async clear() {
    const response = await apiClient.delete('/contact');
    return response.data;
  },
};
