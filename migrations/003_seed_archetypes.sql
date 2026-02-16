-- Migration: 003_seed_archetypes.sql
-- Description: Insert initial archetype profiles

INSERT INTO archetype_profiles (
  name,
  emoji,
  core_drive,
  description,
  keywords,
  motto,
  color,
  created_at
) VALUES
(
  'Builder',
  '🔨',
  'Constructing tangible value through physical presence and hands-on expertise',
  'The Builder creates and maintains the physical infrastructure of society. They find meaning in building things that last, solving practical problems, and creating structures that serve communities.',
  '["construction", "infrastructure", "craftsmanship", "problem-solving", "physical", "hands-on", "practical", "tangible"]',
  'Build it right, build it to last',
  '#FF6B35',
  NOW()
),
(
  'Healer',
  '⚕️',
  'Restoring wellbeing through expertise, empathy, and direct human care',
  'The Healer dedicates themselves to helping others recover and thrive. They combine scientific expertise with genuine compassion, creating safe spaces where healing happens.',
  '["healthcare", "compassion", "empathy", "expertise", "care", "restoration", "wellbeing", "human connection"]',
  'Heal with skill and heart',
  '#FF006E',
  NOW()
),
(
  'Strategist',
  '🎯',
  'Creating advantage through vision, systems thinking, and strategic decision-making',
  'The Strategist sees the big picture and shapes the future. They integrate complex information, anticipate consequences, and guide organizations toward better outcomes.',
  '["strategy", "planning", "vision", "systems thinking", "leadership", "analysis", "decision-making", "complexity"]',
  'Think ahead, lead forward',
  '#3A86FF',
  NOW()
),
(
  'Creator',
  '🎨',
  'Expressing originality through imagination, craft, and bringing visions to life',
  'The Creator brings new things into the world. They see possibilities others miss and have the skill and persistence to turn imagination into reality.',
  '["creativity", "expression", "art", "innovation", "imagination", "originality", "craft", "vision"]',
  'Create what calls to you',
  '#FB5607',
  NOW()
),
(
  'Connector',
  '🤝',
  'Building relationships and enabling human potential through communication and influence',
  'The Connector understands people and brings them together. They create communities, amplify voices, and help others reach their potential through authentic relationships.',
  '["relationships", "communication", "influence", "community", "empathy", "collaboration", "connection", "people"]',
  'Connect hearts and minds',
  '#FFBE0B',
  NOW()
),
(
  'Guardian',
  '🛡️',
  'Protecting systems, people, and values through vigilance and principled action',
  'The Guardian keeps society safe and just. They monitor for threats, uphold standards, and make difficult choices to protect what matters most.',
  '["protection", "safety", "security", "principles", "oversight", "vigilance", "integrity", "accountability"]',
  'Protect with wisdom and strength',
  '#06A77D',
  NOW()
),
(
  'Explorer',
  '🔭',
  'Advancing knowledge through curiosity, investigation, and bold discovery',
  'The Explorer ventures into the unknown and brings back insights. They ask hard questions, test assumptions, and push the boundaries of what we understand.',
  '["discovery", "curiosity", "research", "investigation", "innovation", "learning", "adventure", "knowledge"]',
  'Explore fearlessly, discover boldly',
  '#8338EC',
  NOW()
),
(
  'Operator',
  '⚙️',
  'Keeping complex systems running through precision, coordination, and operational excellence',
  'The Operator makes things work. They master systems, coordinate moving parts, and ensure reliability in complex environments.',
  '["operations", "systems", "coordination", "precision", "reliability", "efficiency", "management", "excellence"]',
  'Run it smoothly, run it right',
  '#FB5607',
  NOW()
);
