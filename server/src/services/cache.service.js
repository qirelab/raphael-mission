import NodeCache from 'node-cache';

// Try to import Redis, but don't fail if not available
let redisClient = null;
try {
  const redis = await import('../config/redis.js');
  redisClient = redis.redisClient;
} catch (error) {
  console.warn('Redis not configured, using in-memory cache (node-cache)');
}

// Default TTL from environment or 5 minutes
const DEFAULT_TTL = parseInt(process.env.CACHE_TTL_MS || '300000') / 1000; // Convert to seconds

class CacheService {
  constructor() {
    this.redisClient = redisClient;
    this.nodeCache = null;
    this.useRedis = false;
    this.initialized = false;
  }

  /**
   * Initialize cache service (auto-detect Redis or fallback to node-cache)
   */
  async initialize() {
    if (this.initialized) return;

    // Try Redis first
    if (this.redisClient) {
      try {
        const isOpen = this.redisClient.isOpen || this.redisClient.isReady;
        if (isOpen) {
          this.useRedis = true;
          console.log('✅ Cache: Using Redis');
          this.initialized = true;
          return;
        }
      } catch (error) {
        console.warn('Redis check failed, falling back to node-cache:', error.message);
      }
    }

    // Fallback to node-cache
    this.nodeCache = new NodeCache({
      stdTTL: DEFAULT_TTL,
      checkperiod: 120, // Check for expired keys every 2 minutes
      useClones: false, // Better performance, but be careful with mutations
      deleteOnExpire: true,
      maxKeys: 1000, // Limit memory usage
    });

    this.useRedis = false;
    console.log('✅ Cache: Using node-cache (in-memory)');
    this.initialized = true;
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {Promise<any|null>} Parsed value or null
   */
  async get(key) {
    await this.initialize();

    try {
      if (this.useRedis) {
        // Redis implementation
        const value = await this.redisClient.get(key);
        if (!value) return null;

        // Try to parse JSON
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      } else {
        // node-cache implementation
        const value = this.nodeCache.get(key);
        return value !== undefined ? value : null;
      }
    } catch (error) {
      console.error(`Cache get error for key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds (default: 5 minutes)
   * @returns {Promise<boolean>} Success status
   */
  async set(key, value, ttl = DEFAULT_TTL) {
    await this.initialize();

    try {
      if (this.useRedis) {
        // Redis implementation
        const serializedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        await this.redisClient.setEx(key, ttl, serializedValue);
        return true;
      } else {
        // node-cache implementation
        return this.nodeCache.set(key, value, ttl);
      }
    } catch (error) {
      console.error(`Cache set error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Delete value from cache
   * @param {string} key - Cache key
   * @returns {Promise<boolean>} Success status
   */
  async del(key) {
    await this.initialize();

    try {
      if (this.useRedis) {
        await this.redisClient.del(key);
        return true;
      } else {
        return this.nodeCache.del(key) > 0;
      }
    } catch (error) {
      console.error(`Cache delete error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all keys matching a pattern
   * @param {string} pattern - Pattern to match (e.g., 'projects:*')
   * @returns {Promise<number>} Number of deleted keys
   */
  async clearPattern(pattern) {
    await this.initialize();

    try {
      if (this.useRedis) {
        // Redis implementation with pattern matching
        const keys = await this.redisClient.keys(pattern);
        if (keys.length === 0) return 0;

        await this.redisClient.del(keys);
        console.log(`Cleared ${keys.length} cache keys matching pattern: ${pattern}`);
        return keys.length;
      } else {
        // node-cache implementation (convert Redis pattern to regex)
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        const allKeys = this.nodeCache.keys();
        const matchingKeys = allKeys.filter((key) => regex.test(key));

        if (matchingKeys.length === 0) return 0;

        this.nodeCache.del(matchingKeys);
        console.log(`Cleared ${matchingKeys.length} cache keys matching pattern: ${pattern}`);
        return matchingKeys.length;
      }
    } catch (error) {
      console.error(`Cache clear pattern error for "${pattern}":`, error);
      return 0;
    }
  }

  /**
   * Check if key exists
   * @param {string} key - Cache key
   * @returns {Promise<boolean>}
   */
  async exists(key) {
    await this.initialize();

    try {
      if (this.useRedis) {
        const exists = await this.redisClient.exists(key);
        return exists === 1;
      } else {
        return this.nodeCache.has(key);
      }
    } catch (error) {
      console.error(`Cache exists error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Get remaining TTL for a key
   * @param {string} key - Cache key
   * @returns {Promise<number>} TTL in seconds, -1 if no expiry, -2 if key doesn't exist
   */
  async ttl(key) {
    await this.initialize();

    try {
      if (this.useRedis) {
        return await this.redisClient.ttl(key);
      } else {
        const ttl = this.nodeCache.getTtl(key);
        if (ttl === undefined) return -2; // Key doesn't exist
        if (ttl === 0) return -1; // No expiry
        return Math.floor((ttl - Date.now()) / 1000); // Convert to seconds
      }
    } catch (error) {
      console.error(`Cache TTL error for key "${key}":`, error);
      return -2;
    }
  }

  /**
   * Clear all cache
   * @returns {Promise<boolean>} Success status
   */
  async flushAll() {
    await this.initialize();

    try {
      if (this.useRedis) {
        await this.redisClient.flushAll();
        console.log('All cache cleared (Redis)');
        return true;
      } else {
        this.nodeCache.flushAll();
        console.log('All cache cleared (node-cache)');
        return true;
      }
    } catch (error) {
      console.error('Cache flush error:', error);
      return false;
    }
  }

  /**
   * Get cache statistics
   * @returns {Promise<Object>} Cache stats
   */
  async getStats() {
    await this.initialize();

    try {
      if (this.useRedis) {
        const info = await this.redisClient.info('stats');
        return {
          provider: 'redis',
          info: info,
        };
      } else {
        const stats = this.nodeCache.getStats();
        return {
          provider: 'node-cache',
          keys: stats.keys,
          hits: stats.hits,
          misses: stats.misses,
          ksize: stats.ksize,
          vsize: stats.vsize,
        };
      }
    } catch (error) {
      console.error('Cache stats error:', error);
      return { provider: this.useRedis ? 'redis' : 'node-cache', error: error.message };
    }
  }

  /**
   * Get cache provider name
   * @returns {string} 'redis' or 'node-cache'
   */
  getProvider() {
    return this.useRedis ? 'redis' : 'node-cache';
  }
}

// Export singleton instance
export const cacheService = new CacheService();
