-- FutureProof Assessment Tables

-- Assessment Sessions Table
CREATE TABLE IF NOT EXISTS assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token UUID NOT NULL UNIQUE,
  age INTEGER NOT NULL CHECK (age >= 13 AND age <= 99),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  phase INTEGER NOT NULL DEFAULT 1 CHECK (phase IN (1, 2, 3)),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  archetype_scores JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Assessment Messages Table
CREATE TABLE IF NOT EXISTS assessment_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_messages_session_id ON assessment_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_assessment_messages_created_at ON assessment_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_status ON assessment_sessions(status);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_created_at ON assessment_sessions(created_at);

-- RLS Policies (if using Supabase Auth)
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous reads/writes to own session
CREATE POLICY "Allow anonymous access to assessment_sessions"
  ON assessment_sessions
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous access to assessment_messages"
  ON assessment_messages
  FOR ALL
  USING (true)
  WITH CHECK (true);
