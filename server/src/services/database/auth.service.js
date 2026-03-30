import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { pool } from '../../config/database.js';
import { logger } from '../../utils/logger.js';
import { generateToken } from '../../utils/jwt.js';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
const LOCKOUT_DURATION = parseInt(process.env.LOCKOUT_DURATION_MS || '900000'); // 15 minutes

// Generate secure session token using crypto
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Check if account is locked
async function isAccountLocked(email) {
  try {
    const recentAttempts = await pool.query(
      `SELECT COUNT(*) as count
      FROM login_attempts
      WHERE email = $1
      AND success = false
      AND attempted_at > NOW() - INTERVAL '1 millisecond' * $2`,
      [email, LOCKOUT_DURATION]
    );

    return parseInt(recentAttempts.rows[0].count) >= MAX_LOGIN_ATTEMPTS;
  } catch (error) {
    logger.error('Error checking account lock:', error);
    return false;
  }
}

// Record login attempt
async function recordLoginAttempt(email, success, ipAddress) {
  try {
    await pool.query(
      'INSERT INTO login_attempts (email, ip_address, success) VALUES ($1, $2, $3)',
      [email, ipAddress, success]
    );
  } catch (error) {
    logger.error('Error recording login attempt:', error);
  }
}

export const authDbService = {
  // Sign in user with security checks
  async signIn(email, password, ipAddress = '127.0.0.1') {
    try {
      // Check if account is locked
      if (await isAccountLocked(email)) {
        throw new Error(
          'Account temporarily locked due to too many failed attempts. Please try again later.'
        );
      }

      // Find user by email
      const users = await pool.query(
        `SELECT id, email, password_hash, name, role, is_active
        FROM users
        WHERE email = $1 AND is_active = true`,
        [email]
      );

      if (users.rows.length === 0) {
        await recordLoginAttempt(email, false, ipAddress);
        throw new Error('Invalid email or password');
      }

      const user = users.rows[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        await recordLoginAttempt(email, false, ipAddress);
        throw new Error('Invalid email or password');
      }

      // Record successful login
      await recordLoginAttempt(email, true, ipAddress);

      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date(Date.now() + SESSION_DURATION);

      // Store session in database
      const sessionResult = await pool.query(
        `INSERT INTO user_sessions (user_id, session_token, expires_at)
        VALUES ($1, $2, $3)
        RETURNING id`,
        [user.id, sessionToken, expiresAt.toISOString()]
      );

      const sessionId = sessionResult.rows[0].id;

      // Clean up expired sessions
      await pool.query('DELETE FROM user_sessions WHERE expires_at < NOW()');

      // Generate JWT token
      const jwtToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId: sessionId,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token: jwtToken,
        sessionId: sessionId,
      };
    } catch (error) {
      logger.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign out user
  async signOut(sessionId) {
    try {
      if (sessionId) {
        await pool.query(
          'DELETE FROM user_sessions WHERE id = $1',
          [sessionId]
        );
      }
      return { success: true };
    } catch (error) {
      logger.error('Sign out error:', error);
      throw error;
    }
  },

  // Get session by ID
  async getSessionById(sessionId) {
    try {
      const sessions = await pool.query(
        `SELECT s.*, u.id, u.email, u.name, u.role
        FROM user_sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.id = $1
        AND s.expires_at > NOW()
        AND u.is_active = true`,
        [sessionId]
      );

      if (sessions.rows.length === 0) {
        return null;
      }

      const session = sessions.rows[0];
      return {
        id: session.id,
        user: {
          id: session.user_id,
          email: session.email,
          name: session.name,
          role: session.role,
        },
        expiresAt: session.expires_at,
      };
    } catch (error) {
      logger.error('Get session error:', error);
      return null;
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      const users = await pool.query(
        `SELECT id, email, name, role, is_active, created_at
        FROM users
        WHERE id = $1 AND is_active = true`,
        [userId]
      );

      if (users.rows.length === 0) {
        return null;
      }

      return users.rows[0];
    } catch (error) {
      logger.error('Get user error:', error);
      return null;
    }
  },

  // Update password with security checks
  async updatePassword(userId, currentPassword, newPassword) {
    try {
      // Get user
      const users = await pool.query(
        'SELECT id, password_hash FROM users WHERE id = $1',
        [userId]
      );

      if (users.rows.length === 0) {
        throw new Error('User not found');
      }

      const user = users.rows[0];

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);

      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Validate new password strength
      if (newPassword.length < 12) {
        throw new Error('Password must be at least 12 characters long');
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(newPassword)) {
        throw new Error(
          'Password must contain uppercase, lowercase, number, and special character'
        );
      }

      // Hash new password
      const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
      const passwordHash = await bcrypt.hash(newPassword, bcryptRounds);

      // Update password
      await pool.query(
        'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
        [passwordHash, userId]
      );

      logger.info(`Password updated for user ${userId}`);

      return { success: true };
    } catch (error) {
      logger.error('Update password error:', error);
      throw error;
    }
  },

  // Get security statistics (for admin dashboard)
  async getSecurityStats() {
    try {
      const stats = await pool.query(
        `SELECT
          (SELECT COUNT(*) FROM login_attempts WHERE success = false AND attempted_at > NOW() - INTERVAL '24 hours') as failed_attempts_24h,
          (SELECT COUNT(*) FROM login_attempts WHERE success = true AND attempted_at > NOW() - INTERVAL '24 hours') as successful_logins_24h,
          (SELECT COUNT(*) FROM user_sessions WHERE expires_at > NOW()) as active_sessions`
      );

      return stats.rows[0];
    } catch (error) {
      logger.error('Get security stats error:', error);
      return null;
    }
  },

  // Clean up expired sessions (can be called periodically)
  async cleanupExpiredSessions() {
    try {
      const result = await pool.query(
        'DELETE FROM user_sessions WHERE expires_at < NOW()'
      );

      logger.info(`Cleaned up ${result.rowCount} expired sessions`);
      return result.rowCount;
    } catch (error) {
      logger.error('Cleanup expired sessions error:', error);
      return 0;
    }
  },
};
