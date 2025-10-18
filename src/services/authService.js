import { neonClient } from './neon.js';
import bcrypt from 'bcryptjs';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// Generate session token
function generateSessionToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get client IP (simplified for demo)
function getClientIP() {
  // In production, get real IP from request headers
  return '127.0.0.1';
}

// Check if account is locked
async function isAccountLocked(email) {
  try {
    const recentAttempts = await neonClient`
      SELECT COUNT(*) as count
      FROM login_attempts 
      WHERE email = ${email} 
      AND success = false 
      AND attempted_at > NOW() - INTERVAL '${LOCKOUT_DURATION}ms'
    `;

    return recentAttempts[0].count >= MAX_LOGIN_ATTEMPTS;
  } catch (error) {
    console.error('Error checking account lock:', error);
    return false;
  }
}

// Record login attempt
async function recordLoginAttempt(email, success, ipAddress) {
  try {
    await neonClient`
      INSERT INTO login_attempts (email, ip_address, success)
      VALUES (${email}, ${ipAddress}, ${success})
    `;
  } catch (error) {
    console.error('Error recording login attempt:', error);
  }
}

export const authService = {
  // Sign in user with security checks
  async signIn(email, password) {
    try {
      // Check if account is locked
      if (await isAccountLocked(email)) {
        throw new Error(
          'Account temporarily locked due to too many failed attempts. Please try again later.'
        );
      }

      // Find user by email
      const users = await neonClient`
        SELECT id, email, password_hash, name, role, is_active 
        FROM users 
        WHERE email = ${email} AND is_active = true
      `;

      if (users.length === 0) {
        await recordLoginAttempt(email, false, getClientIP());
        throw new Error('Invalid email or password');
      }

      const user = users[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        await recordLoginAttempt(email, false, getClientIP());
        throw new Error('Invalid email or password');
      }

      // Record successful login
      await recordLoginAttempt(email, true, getClientIP());

      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date(Date.now() + SESSION_DURATION);

      // Store session in database
      await neonClient`
        INSERT INTO user_sessions (user_id, session_token, expires_at)
        VALUES (${user.id}, ${sessionToken}, ${expiresAt.toISOString()})
      `;

      // Clean up expired sessions
      await neonClient`
        DELETE FROM user_sessions 
        WHERE expires_at < NOW()
      `;

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: {
          session_token: sessionToken,
        },
      };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign out user
  async signOut(sessionToken) {
    try {
      if (sessionToken) {
        await neonClient`
          DELETE FROM user_sessions 
          WHERE session_token = ${sessionToken}
        `;
      }
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Get current session
  async getSession() {
    try {
      // Get session token from localStorage or cookies
      const sessionToken = localStorage.getItem('session_token');
      if (!sessionToken) {
        return { data: { session: null } };
      }

      // Verify session in database
      const sessions = await neonClient`
        SELECT s.*, u.id, u.email, u.name, u.role
        FROM user_sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = ${sessionToken} 
        AND s.expires_at > NOW()
        AND u.is_active = true
      `;

      if (sessions.length === 0) {
        // Clean up invalid session
        localStorage.removeItem('session_token');
        return { data: { session: null } };
      }

      const session = sessions[0];
      return {
        data: {
          session: {
            session_token: sessionToken,
            user: {
              id: session.id,
              email: session.email,
              name: session.name,
              role: session.role,
            },
          },
        },
      };
    } catch (error) {
      console.error('Get session error:', error);
      return { data: { session: null } };
    }
  },

  // Get current user
  async getUser() {
    try {
      const sessionResult = await this.getSession();
      if (sessionResult.data.session) {
        return { data: { user: sessionResult.data.session.user } };
      }
      return { data: { user: null } };
    } catch (error) {
      console.error('Get user error:', error);
      return { data: { user: null } };
    }
  },

  // Auth state change listener (simplified)
  onAuthStateChange(callback) {
    // Simple implementation - check session on page load
    this.getSession()
      .then((result) => {
        callback('SIGNED_IN', result.data.session);
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

  // Update password with security checks
  async updatePassword(newPassword) {
    try {
      const sessionResult = await this.getSession();
      if (!sessionResult.data.session) {
        throw new Error('Not authenticated');
      }

      // Validate password strength
      if (newPassword.length < 12) {
        throw new Error('Password must be at least 12 characters long');
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(newPassword)) {
        throw new Error(
          'Password must contain uppercase, lowercase, number, and special character'
        );
      }

      const userId = sessionResult.data.session.user.id;
      const passwordHash = await bcrypt.hash(newPassword, 12);

      await neonClient`
        UPDATE users 
        SET password_hash = ${passwordHash}, updated_at = NOW()
        WHERE id = ${userId}
      `;

      return { data: { user: sessionResult.data.session.user } };
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },

  // Get security statistics (for admin dashboard)
  async getSecurityStats() {
    try {
      const stats = await neonClient`
        SELECT 
          (SELECT COUNT(*) FROM login_attempts WHERE success = false AND attempted_at > NOW() - INTERVAL '24 hours') as failed_attempts_24h,
          (SELECT COUNT(*) FROM login_attempts WHERE success = true AND attempted_at > NOW() - INTERVAL '24 hours') as successful_logins_24h,
          (SELECT COUNT(*) FROM user_sessions WHERE expires_at > NOW()) as active_sessions
      `;

      return stats[0];
    } catch (error) {
      console.error('Get security stats error:', error);
      return null;
    }
  },
};
