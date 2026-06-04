-- ============================================================================
-- Upsert admin user — set/reset admin login + password
-- Version: 019
-- Description: Ensure an active admin account exists with the requested email
--              and password. Idempotent (UPSERT): if the email already exists
--              its password is reset and admin/active flags are re-applied;
--              otherwise the account is created. `password_hash` is bcrypt
--              (cost 12) — the plaintext is never stored in the repo.
-- ============================================================================

INSERT INTO users (email, password_hash, name, role, is_active)
VALUES (
    'admin@raphaelmission.org',
    '$2a$12$Oz/tZPxnhGv.hnXUKXdO..5SCtZWpMlXcJVPZ.oppkEdw8HTcS/46',
    'Администратор',
    'admin',
    true
)
ON CONFLICT (email) DO UPDATE
SET password_hash = EXCLUDED.password_hash,
    role = 'admin',
    is_active = true,
    failed_login_attempts = 0,
    locked_until = NULL,
    updated_at = NOW();
