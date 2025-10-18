import { neonContactService } from './neonContactService';

// Simple, reliable contact service with immediate updates
export const contactService = {
  // Get contact info - simple and direct
  async get() {
    return await neonContactService.get();
  },

  // Update contact info - target the single existing record
  async update(contactData) {
    return await neonContactService.update(contactData);
  },

  // Delete all contact info (for admin use)
  async clear() {
    return await neonContactService.clear();
  },
};
