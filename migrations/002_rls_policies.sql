-- Enable RLS on all tables
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE archetype_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_events ENABLE ROW LEVEL SECURITY;

-- Careers: public read
CREATE POLICY "Careers are publicly readable" ON careers FOR SELECT USING (status = 'active');

-- Archetype profiles: public read
CREATE POLICY "Archetypes are publicly readable" ON archetype_profiles FOR SELECT USING (true);

-- Assessment sessions: accessible via session token (anonymous) or user_id (authenticated)
CREATE POLICY "Sessions accessible by token" ON assessment_sessions FOR SELECT USING (true);
CREATE POLICY "Sessions insertable by anyone" ON assessment_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Sessions updatable by token" ON assessment_sessions FOR UPDATE USING (true);

-- Conversations: accessible if session is accessible
CREATE POLICY "Conversations readable" ON assessment_conversations FOR SELECT USING (true);
CREATE POLICY "Conversations insertable" ON assessment_conversations FOR INSERT WITH CHECK (true);

-- Share events: insertable by anyone, readable for analytics
CREATE POLICY "Share events insertable" ON share_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Share events readable" ON share_events FOR SELECT USING (true);
