-- Nodo Serrano Database Schema
-- Run this SQL in your Neon database console

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at DESC);

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subscribers_updated_at 
    BEFORE UPDATE ON subscribers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Add a view for recent subscribers
CREATE OR REPLACE VIEW recent_subscribers AS
SELECT 
    id,
    email,
    created_at,
    updated_at
FROM subscribers
WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Grant permissions (adjust the username as needed)
-- GRANT ALL PRIVILEGES ON subscribers TO your_username;
-- GRANT ALL PRIVILEGES ON recent_subscribers TO your_username;