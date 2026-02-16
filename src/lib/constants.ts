import { Archetype, ScoreBand } from '../types/archetype';
import { Career } from '../types/career';

export const ARCHETYPES: Archetype[] = [
  {
    name: 'Builder',
    emoji: '⚡',
    icon: 'hammer',
    core_drive: 'Create tangible things',
    description: 'Builders thrive on creating physical, tangible results. They love working with their hands, building infrastructure, and seeing immediate, concrete outcomes.',
    keywords: ['build', 'make', 'construct', 'hands-on', 'physical', 'craft', 'engineer', 'fix', 'repair', 'design', 'prototype', 'hardware', 'tools', 'tangible', 'manufacture'],
    motto: 'The robots need you more than you need them.',
    color: '#8B5CF6',
  },
  {
    name: 'Healer',
    emoji: '💚',
    icon: 'heart',
    core_drive: 'Help people directly',
    description: 'Healers are driven by compassion and the desire to help others feel better. They excel in roles that require empathy, understanding, and direct human care.',
    keywords: ['help', 'care', 'heal', 'support', 'empathy', 'medicine', 'therapy', 'nurse', 'doctor', 'patient', 'wellness', 'mental health', 'veterinary', 'emergency', 'compassion'],
    motto: 'The world will always need human hearts.',
    color: '#10B981',
  },
  {
    name: 'Strategist',
    emoji: '🎯',
    icon: 'target',
    core_drive: 'Solve complex problems',
    description: 'Strategists excel at analyzing complex systems, seeing patterns others miss, and developing effective plans to navigate complicated challenges.',
    keywords: ['strategy', 'solve', 'analyze', 'plan', 'optimize', 'systems', 'logic', 'puzzle', 'complex', 'business', 'consulting', 'operations', 'military', 'logistics'],
    motto: 'AI can calculate. You can outthink.',
    color: '#3B82F6',
  },
  {
    name: 'Creator',
    emoji: '🎨',
    icon: 'palette',
    core_drive: 'Express and innovate',
    description: 'Creators are driven by the need for original expression and bringing new ideas to life. They thrive on imagination, originality, and the freedom to innovate.',
    keywords: ['create', 'art', 'design', 'music', 'film', 'write', 'story', 'express', 'innovate', 'imagine', 'original', 'creative', 'visual', 'perform', 'compose'],
    motto: 'Machines remix. You originate.',
    color: '#EC4899',
  },
  {
    name: 'Connector',
    emoji: '🤝',
    icon: 'users',
    core_drive: 'Bring people together',
    description: 'Connectors are energized by building relationships, leading teams, and creating communities where people feel valued and inspired.',
    keywords: ['connect', 'people', 'team', 'lead', 'teach', 'communicate', 'network', 'community', 'sales', 'recruit', 'inspire', 'mentor', 'collaborate', 'social', 'relationship'],
    motto: 'No algorithm replaces a real connection.',
    color: '#F59E0B',
  },
  {
    name: 'Guardian',
    emoji: '🛡️',
    icon: 'shield',
    core_drive: 'Protect and maintain',
    description: 'Guardians are driven by responsibility and the need to protect others and maintain order. They excel in roles requiring vigilance, integrity, and service.',
    keywords: ['protect', 'security', 'safety', 'law', 'enforce', 'guard', 'compliance', 'environment', 'defend', 'maintain', 'monitor', 'investigate', 'regulate', 'justice', 'cyber'],
    motto: 'Someone has to watch the watchers.',
    color: '#6366F1',
  },
  {
    name: 'Explorer',
    emoji: '🔭',
    icon: 'compass',
    core_drive: 'Discover and investigate',
    description: 'Explorers are driven by curiosity and the desire to understand how things work. They thrive on discovery, research, and pushing the boundaries of knowledge.',
    keywords: ['discover', 'research', 'explore', 'investigate', 'science', 'curious', 'experiment', 'learn', 'data', 'study', 'observe', 'analyze', 'question', 'frontier', 'space'],
    motto: 'The best discoveries are still ahead.',
    color: '#14B8A6',
  },
  {
    name: 'Operator',
    emoji: '⚙️',
    icon: 'cog',
    core_drive: 'Run and optimize systems',
    description: 'Operators excel at managing processes, coordinating complex systems, and ensuring everything runs smoothly and efficiently.',
    keywords: ['operate', 'manage', 'organize', 'efficient', 'process', 'system', 'logistics', 'supply chain', 'project', 'coordinate', 'aviation', 'transport', 'run', 'execute', 'optimize'],
    motto: 'You keep the world running. Literally.',
    color: '#F97316',
  },
];

export const SCORING_WEIGHTS: Record<string, number> = {
  physical_presence: 0.25,
  human_judgment: 0.25,
  creative_originality: 0.20,
  relationship_dependency: 0.15,
  regulatory_barrier: 0.15,
};

export interface ScoreBandDefinition {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
}

export const SCORE_BANDS: ScoreBandDefinition[] = [
  {
    min: 80,
    max: 100,
    label: 'Highly Defensible',
    description: 'This career path is well-protected against AI disruption and remains highly valuable.',
    color: '#10B981', // Green
  },
  {
    min: 60,
    max: 79,
    label: 'Evolving',
    description: 'This career has moderate resilience but will require continuous adaptation and skill development.',
    color: '#FBBF24', // Yellow
  },
  {
    min: 40,
    max: 59,
    label: 'At Risk',
    description: 'This career faces significant AI competition and will require strategic pivoting to remain viable.',
    color: '#FB923C', // Orange
  },
  {
    min: 1,
    max: 39,
    label: 'High Disruption',
    description: 'This career is at high risk of disruption and significant change is likely within the next decade.',
    color: '#EF4444', // Red
  },
];

export interface DiscoveryQuestion {
  phase: 1 | 2 | 3;
  order: number;
  question: string;
  type: 'open-ended' | 'multi-select' | 'reflection';
  context: string;
}

export const DISCOVERY_QUESTIONS: DiscoveryQuestion[] = [
  {
    phase: 1,
    order: 1,
    question: 'What activities make you lose track of time?',
    type: 'open-ended',
    context: 'Understanding your natural interests and what brings you flow.',
  },
  {
    phase: 1,
    order: 2,
    question: 'What do people often ask you for help with?',
    type: 'open-ended',
    context: 'Identifying your natural strengths and what others value in you.',
  },
  {
    phase: 1,
    order: 3,
    question: 'What impact do you want to have on the world?',
    type: 'open-ended',
    context: 'Discovering your core values and what gives your work meaning.',
  },
  {
    phase: 2,
    order: 4,
    question: 'How important is working with people versus working independently?',
    type: 'multi-select',
    context: 'Understanding your preferred work environment and interaction style.',
  },
  {
    phase: 2,
    order: 5,
    question: 'What kind of problems energize you most?',
    type: 'open-ended',
    context: 'Exploring problem-solving preferences and intellectual engagement.',
  },
  {
    phase: 2,
    order: 6,
    question: 'What does success look like to you?',
    type: 'reflection',
    context: 'Clarifying personal definitions of achievement and career satisfaction.',
  },
  {
    phase: 3,
    order: 7,
    question: 'What worries you most about your career future?',
    type: 'open-ended',
    context: 'Identifying concerns and areas where you want additional resilience.',
  },
  {
    phase: 3,
    order: 8,
    question: 'What are you willing to commit to learning over the next 5 years?',
    type: 'reflection',
    context: 'Understanding your commitment to growth and skill development.',
  },
];

// Scout-specific discovery questions (for the AI career guide)
export interface ScoutDiscoveryQuestion {
  id: number;
  question: string;
  context: string;
}

export const SCOUT_DISCOVERY_QUESTIONS: ScoutDiscoveryQuestion[] = [
  {
    id: 1,
    question: "What do you spend your free time on? Hobbies, games, creative stuff—whatever pulls you in?",
    context: "Understanding how they naturally spend unstructured time reveals intrinsic interests."
  },
  {
    id: 2,
    question: "What's a skill or subject where people come to you for help?",
    context: "Identifies natural strengths and areas where they've developed competency."
  },
  {
    id: 3,
    question: "If you could design your perfect day 10 years from now, what would you be doing?",
    context: "Reveals aspirations, lifestyle preferences, and long-term vision."
  },
  {
    id: 4,
    question: "What gets you frustrated or angry? (Like, what injustices or inefficiencies bug you?)",
    context: "Uncovers values and motivation drivers—what they care enough to fix."
  },
  {
    id: 5,
    question: "How do you like to learn? Through hands-on experiments, reading, talking to people, building things?",
    context: "Identifies learning style and modality preferences for career fit."
  },
  {
    id: 6,
    question: "Do you want your work to directly impact other people, or is behind-the-scenes work appealing?",
    context: "Determines impact preference and work environment fit."
  },
  {
    id: 7,
    question: "What's the difference between a job and a career to you?",
    context: "Reveals mindset about work, ambition, and growth orientation."
  },
  {
    id: 8,
    question: "Is stability important, or would you rather take risks for potential bigger payoffs?",
    context: "Identifies risk tolerance and career path preferences."
  }
];
