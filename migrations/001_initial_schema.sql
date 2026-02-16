-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Archetype profiles (reference data)
CREATE TABLE archetype_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  emoji VARCHAR(10),
  core_drive TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords JSONB NOT NULL DEFAULT '[]',
  motto VARCHAR(255),
  color VARCHAR(7),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Careers master table
CREATE TABLE careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  primary_archetype VARCHAR(50) NOT NULL REFERENCES archetype_profiles(name),
  secondary_archetype VARCHAR(50) REFERENCES archetype_profiles(name),
  defensibility_score INT NOT NULL CHECK (defensibility_score >= 1 AND defensibility_score <= 100),
  factor_physical_presence INT NOT NULL CHECK (factor_physical_presence >= 0 AND factor_physical_presence <= 100),
  factor_human_judgment INT NOT NULL CHECK (factor_human_judgment >= 0 AND factor_human_judgment <= 100),
  factor_creative_originality INT NOT NULL CHECK (factor_creative_originality >= 0 AND factor_creative_originality <= 100),
  factor_relationship_dependency INT NOT NULL CHECK (factor_relationship_dependency >= 0 AND factor_relationship_dependency <= 100),
  factor_regulatory_barrier INT NOT NULL CHECK (factor_regulatory_barrier >= 0 AND factor_regulatory_barrier <= 100),
  entry_salary_low INT,
  entry_salary_high INT,
  mid_salary_low INT,
  mid_salary_high INT,
  senior_salary_low INT,
  senior_salary_high INT,
  day_to_day_description TEXT NOT NULL,
  ai_impact_analysis TEXT NOT NULL,
  skills_to_develop JSONB DEFAULT '[]',
  education_path JSONB,
  real_world_examples JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessment sessions
CREATE TABLE assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_age INT NOT NULL CHECK (user_age >= 13 AND user_age <= 99),
  phase INT NOT NULL DEFAULT 1 CHECK (phase >= 1 AND phase <= 3),
  phase_progress FLOAT DEFAULT 0,
  interests_raw JSONB DEFAULT '[]',
  strengths_raw JSONB DEFAULT '[]',
  values_raw JSONB DEFAULT '[]',
  primary_archetype VARCHAR(50),
  secondary_archetype VARCHAR(50),
  archetype_scores JSONB,
  recommended_career_ids UUID[] DEFAULT ARRAY[]::UUID[],
  recommended_with_scores JSONB,
  paths_to_avoid JSONB,
  ikigai_diagram JSONB,
  session_token VARCHAR(512) UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  user_id UUID,
  status VARCHAR(20) DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_message_at TIMESTAMPTZ
);

-- Assessment conversations (Scout <-> user exchanges)
CREATE TABLE assessment_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  sequence_number INT NOT NULL,
  scout_message TEXT NOT NULL,
  user_response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Share events (virality tracking)
CREATE TABLE share_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  platform VARCHAR(50),
  referrer_session_id UUID REFERENCES assessment_sessions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_careers_archetype ON careers(primary_archetype);
CREATE INDEX idx_careers_score ON careers(defensibility_score DESC);
CREATE INDEX idx_careers_status ON careers(status);
CREATE INDEX idx_sessions_token ON assessment_sessions(session_token);
CREATE INDEX idx_sessions_status ON assessment_sessions(status);
CREATE INDEX idx_conversations_session ON assessment_conversations(session_id, sequence_number);
CREATE INDEX idx_share_session ON share_events(session_id);
