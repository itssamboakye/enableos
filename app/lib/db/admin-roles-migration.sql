-- Admin roles migration
-- Add role column to users table and set admin users

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Set admin users
UPDATE users 
SET role = 'admin' 
WHERE email IN ('luis@nson.ai', 'sam@nson.ai');

-- Create index for faster admin queries
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
