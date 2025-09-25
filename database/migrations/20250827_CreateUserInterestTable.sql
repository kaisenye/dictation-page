-- User Interests Table for Email Collection
-- This table stores emails for both download requests and waitlist signups

CREATE TABLE user_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  interest_type TEXT NOT NULL CHECK (interest_type IN ('download', 'waitlist')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional metadata that can be stored as JSON
  metadata JSONB DEFAULT '{}',
  
  -- Email tracking fields
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Prevent duplicate entries for same email/type combination
  UNIQUE(email, interest_type)
);

-- Indexes for better performance
CREATE INDEX idx_user_interests_email ON user_interests(email);
CREATE INDEX idx_user_interests_type ON user_interests(interest_type);
CREATE INDEX idx_user_interests_created_at ON user_interests(created_at);

-- Example queries:

-- Get all download requests
-- SELECT * FROM user_interests WHERE interest_type = 'download' ORDER BY created_at DESC;

-- Get all waitlist signups  
-- SELECT * FROM user_interests WHERE interest_type = 'waitlist' ORDER BY created_at DESC;

-- Count total interested users
-- SELECT interest_type, COUNT(*) FROM user_interests GROUP BY interest_type;

-- Find users who signed up for both download and waitlist
-- SELECT email FROM user_interests GROUP BY email HAVING COUNT(DISTINCT interest_type) = 2;