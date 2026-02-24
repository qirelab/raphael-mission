import { apiClient } from './apiClient.js';

/**
 * Authentication service - works with backend API and JWT tokens
 */
export const authService = {
  /**
   * Sign in user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User data and token
   */
  async signIn(email, password) {
    try {
      const response = await apiClient.post('/auth/signin', {
        email,
        password,
      });

      // Store JWT token
      if (response.success && response.data.token) {
        apiClient.setToken(response.data.token);
      }

      return {
        user: response.data.user,
        session: {
          session_token: response.data.token, // For compatibility with old code
        },
      };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      // Call backend to invalidate session
      await apiClient.post('/auth/signout');

      // Remove token from localStorage
      apiClient.removeToken();

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      // Remove token even if request fails
      apiClient.removeToken();
      throw error;
    }
  },

  /**
   * Get current session
   * @returns {Promise<Object>} Session data with user
   */
  async getSession() {
    try {
      const token = apiClient.getToken();

      if (!token) {
        return { data: { session: null } };
      }

      const response = await apiClient.get('/auth/session');

      if (response.success && response.data.session) {
        return {
          data: {
            session: {
              ...response.data.session,
              session_token: token, // For compatibility
            },
          },
        };
      }

      return { data: { session: null } };
    } catch (error) {
      console.error('Get session error:', error);
      // If session is invalid, remove token
      if (error.status === 401) {
        apiClient.removeToken();
      }
      return { data: { session: null } };
    }
  },

  /**
   * Get current user
   * @returns {Promise<Object>} User data
   */
  async getUser() {
    try {
      const token = apiClient.getToken();

      if (!token) {
        return { data: { user: null } };
      }

      const response = await apiClient.get('/auth/user');

      if (response.success && response.data.user) {
        return { data: { user: response.data.user } };
      }

      return { data: { user: null } };
    } catch (error) {
      console.error('Get user error:', error);
      // If unauthorized, remove token
      if (error.status === 401) {
        apiClient.removeToken();
      }
      return { data: { user: null } };
    }
  },

  /**
   * Auth state change listener
   * @param {Function} callback - Callback function(event, session)
   * @returns {Object} Subscription object with unsubscribe method
   */
  onAuthStateChange(callback) {
    // Check session on initialization
    this.getSession()
      .then((result) => {
        if (result.data.session) {
          callback('SIGNED_IN', result.data.session);
        } else {
          callback('SIGNED_OUT', null);
        }
      })
      .catch(() => {
        callback('SIGNED_OUT', null);
      });

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            // No-op for now
          },
        },
      },
    };
  },

  /**
   * Update user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success response
   */
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.put('/auth/password', {
        currentPassword,
        newPassword,
      });

      return {
        data: {
          success: response.success,
          message: response.message
        }
      };
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },

  /**
   * Get security statistics (admin only)
   * @returns {Promise<Object>} Security stats
   */
  async getSecurityStats() {
    try {
      const response = await apiClient.get('/auth/security-stats');

      if (response.success) {
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Get security stats error:', error);
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated() {
    return !!apiClient.getToken();
  },

  /**
   * Get stored JWT token
   * @returns {string|null} JWT token or null
   */
  getToken() {
    return apiClient.getToken();
  },
};
