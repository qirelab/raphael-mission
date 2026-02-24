// Load environment variables FIRST
import './loadEnv.js';

import app from './app.js';
import { logger } from './utils/logger.js';
import { connectRedis } from './config/redis.js';
import { testConnection, closePool } from './config/database.js';

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    // Test database connection
    logger.info('Testing database connection...');
    await testConnection();

    // Connect to Redis (optional - will fallback to node-cache if unavailable)
    logger.info('Connecting to Redis...');
    try {
      await connectRedis();
      logger.info('✅ Redis: Connected successfully');
    } catch (error) {
      logger.warn('⚠️  Redis: Connection failed, using in-memory cache (node-cache)');
      logger.warn(`Redis error: ${error.message}`);
    }

    // Start Express server
    const server = app.listen(PORT, () => {
      logger.info('');
      logger.info('🚀 ========================================');
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`🚀 Environment: ${NODE_ENV}`);
      logger.info(`🚀 Health check: http://localhost:${PORT}/health`);
      logger.info(`🚀 API: http://localhost:${PORT}/api`);
      logger.info('🚀 ========================================');
      logger.info('');
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`\n${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed');

        // Close database pool
        await closePool();

        logger.info('Graceful shutdown completed');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
