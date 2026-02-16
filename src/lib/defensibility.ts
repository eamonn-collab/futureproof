/**
 * Defensibility score utilities and constants
 */

export const DEFENSIBILITY_BANDS = {
  HIGH: { min: 75, max: 100, label: 'Highly Resilient', color: 'green' },
  MODERATE: { min: 50, max: 74, label: 'Moderately Resilient', color: 'yellow' },
  SOME_RISK: { min: 25, max: 49, label: 'Some Risk', color: 'orange' },
  HIGH_RISK: { min: 0, max: 24, label: 'High Risk', color: 'red' },
} as const;

export interface DefensibilityBand {
  label: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  bg: string;
  text: string;
  badge: string;
}

export function getDefensibilityBand(score: number): DefensibilityBand {
  if (score >= DEFENSIBILITY_BANDS.HIGH.min) {
    return {
      label: DEFENSIBILITY_BANDS.HIGH.label,
      color: 'green',
      bg: 'bg-green-100',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-800 border-green-300',
    };
  } else if (score >= DEFENSIBILITY_BANDS.MODERATE.min) {
    return {
      label: DEFENSIBILITY_BANDS.MODERATE.label,
      color: 'yellow',
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
  } else if (score >= DEFENSIBILITY_BANDS.SOME_RISK.min) {
    return {
      label: DEFENSIBILITY_BANDS.SOME_RISK.label,
      color: 'orange',
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
    };
  } else {
    return {
      label: DEFENSIBILITY_BANDS.HIGH_RISK.label,
      color: 'red',
      bg: 'bg-red-100',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-800 border-red-300',
    };
  }
}

export function getRankBadgeColor(rank: number): string {
  switch (rank) {
    case 1:
      return 'bg-amber-400 text-amber-900';
    case 2:
      return 'bg-gray-300 text-gray-900';
    case 3:
      return 'bg-orange-300 text-orange-900';
    default:
      return 'bg-blue-100 text-blue-900';
  }
}

export function getRankEmoji(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${rank}`;
  }
}

export const ARCHETYPE_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  purple: {
    from: 'from-purple-500',
    to: 'to-purple-600',
    accent: 'bg-purple-100 text-purple-900',
  },
  blue: {
    from: 'from-blue-500',
    to: 'to-blue-600',
    accent: 'bg-blue-100 text-blue-900',
  },
  green: {
    from: 'from-green-500',
    to: 'to-green-600',
    accent: 'bg-green-100 text-green-900',
  },
  pink: {
    from: 'from-pink-500',
    to: 'to-pink-600',
    accent: 'bg-pink-100 text-pink-900',
  },
  orange: {
    from: 'from-orange-500',
    to: 'to-orange-600',
    accent: 'bg-orange-100 text-orange-900',
  },
  yellow: {
    from: 'from-yellow-500',
    to: 'to-yellow-600',
    accent: 'bg-yellow-100 text-yellow-900',
  },
  red: {
    from: 'from-red-500',
    to: 'to-red-600',
    accent: 'bg-red-100 text-red-900',
  },
  indigo: {
    from: 'from-indigo-500',
    to: 'to-indigo-600',
    accent: 'bg-indigo-100 text-indigo-900',
  },
};

export function getArchetypeGradient(color: string) {
  return ARCHETYPE_COLORS[color.toLowerCase()] || ARCHETYPE_COLORS.blue;
}
