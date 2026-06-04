-- ============================================================================
-- Fix user_sessions schema — id must be VARCHAR, not INTEGER
-- Version: 020
-- Description: The legacy production user_sessions table has `id` as an integer
--              (SERIAL), but the app stores a UUID string session id. That made
--              every signin fail at the session INSERT with
--              "invalid input syntax for type integer: <uuid>" (pg 22P02) and
--              return HTTP 500. Recreate the table with the schema the code
--              expects (id VARCHAR(255)). Sessions are ephemeral — dropping the
--              table only clears active logins, which is acceptable.
-- ============================================================================

DROP TABLE IF EXISTS user_sessions CASCADE;

CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
