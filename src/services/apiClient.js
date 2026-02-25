// API Client for backend communication with JWT authentication

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * HTTP Client wrapper with automatic JWT token handling
 */
class ApiClient {
  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get JWT token from localStorage
   */
  getToken() {
    return localStorage.getItem('jwt_token');
  }

  /**
   * Set JWT token in localStorage
   */
  setToken(token) {
    localStorage.setItem('jwt_token', token);
  }

  /**
   * Remove JWT token from localStorage
   */
  removeToken() {
    localStorage.removeItem('jwt_token');
  }

  /**
   * Build headers with JWT token if available
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    let data;
    try {
      if (isJson) {
        data = await response.json();
      } else {
        // If not JSON, try to get text (might be HTML error page)
        const text = await response.text();
        data = { error: { message: `Server returned non-JSON response: ${text.substring(0, 100)}...` } };
      }
    } catch (parseError) {
      // If parsing fails completely
      throw new Error(`Failed to parse server response: ${parseError.message}`);
    }

    if (!response.ok) {
      // Handle error response
      const error = new Error(data.error?.message || 'API request failed');
      error.status = response.status;
      error.code = data.error?.code;
      error.details = data.error?.details;
      throw error;
    }

    return data;
  }

  /**
   * Handle network errors
   */
  handleNetworkError(error, method, endpoint) {
    console.error(`${method} ${endpoint} failed:`, error);

    // If it's already our custom error, just rethrow
    if (error.status) {
      throw error;
    }

    // Handle network errors (CORS, connection failed, etc.)
    const networkError = new Error(
      error.message === 'Failed to fetch'
        ? 'Не удалось подключиться к серверу. Проверьте интернет-соединение.'
        : error.message
    );
    networkError.isNetworkError = true;
    throw networkError;
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(options.headers),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      this.handleNetworkError(error, 'GET', endpoint);
    }
  }

  /**
   * POST request
   */
  async post(endpoint, data = null, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      this.handleNetworkError(error, 'POST', endpoint);
    }
  }

  /**
   * PUT request
   */
  async put(endpoint, data = null, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      this.handleNetworkError(error, 'PUT', endpoint);
    }
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = null, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(options.headers),
        body: data ? JSON.stringify(data) : null,
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      this.handleNetworkError(error, 'PATCH', endpoint);
    }
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(options.headers),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      this.handleNetworkError(error, 'DELETE', endpoint);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export default ApiClient;
