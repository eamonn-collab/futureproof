import { Career } from '@/types/career';

export interface IkigaiData {
  loves: string[];
  goodAt: string[];
  aiResilient: {
    score: number;
    label: string;
    topCareer: string;
  };
  earningPotential: {
    range: string;
    trajectory: string;
  };
  sweetSpot: {
    careers: string[];
    description: string;
  };
}

/**
 * Calculates data for the Modified Ikigai visualization
 * Combines user's interests and strengths with career defensibility and earning potential
 */
export function calculateIkigai(
  interests: string[],
  strengths: string[],
  topCareers: Career[]
): IkigaiData {
  // Extract loves (interests) and goodAt (strengths)
  const loves = interests.filter((item) => item.trim().length > 0);
  const goodAt = strengths.filter((item) => item.trim().length > 0);

  // Find AI-resilient career (highest defensibility from top careers)
  let aiResilient = {
    score: 0,
    label: 'Highly Defensible',
    topCareer: topCareers[0]?.title || 'Career Path',
  };

  if (topCareers.length > 0) {
    const bestDefended = topCareers.reduce((prev, current) =>
      current.defensibility_score > prev.defensibility_score ? current : prev
    );

    aiResilient = {
      score: bestDefended.defensibility_score,
      label: getDefensibilityLabel(bestDefended.defensibility_score),
      topCareer: bestDefended.title,
    };
  }

  // Calculate earning potential from top careers
  let minEntry = Infinity;
  let maxSenior = 0;

  topCareers.forEach((career) => {
    if (career.entry_salary_low < minEntry) {
      minEntry = career.entry_salary_low;
    }
    if (career.senior_salary_high > maxSenior) {
      maxSenior = career.senior_salary_high;
    }
  });

  const earningRange =
    minEntry !== Infinity && maxSenior > 0
      ? `$${formatSalary(minEntry)} - $${formatSalary(maxSenior)}`
      : 'Variable';

  // Determine trajectory based on salary growth
  const avgCareerGrowth =
    topCareers.length > 0
      ? topCareers.reduce((sum, career) => {
          const growth = career.senior_salary_high - career.entry_salary_low;
          return sum + growth;
        }, 0) / topCareers.length
      : 0;

  const trajectory =
    avgCareerGrowth > 100000
      ? 'Strong growth potential'
      : avgCareerGrowth > 50000
        ? 'Moderate growth potential'
        : 'Stable earnings';

  const earningPotential = {
    range: earningRange,
    trajectory,
  };

  // Sweet spot: intersection of all 4 dimensions
  const careerTitles = topCareers.map((c) => c.title);
  const primaryCareer = topCareers[0]?.title || 'Your ideal career';

  const sweetSpot = {
    careers: careerTitles.slice(0, 3),
    description: `Your intersection of passion, strength, AI resilience, and earning potential points toward careers like ${primaryCareer}. These paths align with what you love and excel at while remaining defensible in the AI era.`,
  };

  return {
    loves,
    goodAt,
    aiResilient,
    earningPotential,
    sweetSpot,
  };
}

/**
 * Helper function to get defensibility label
 */
function getDefensibilityLabel(score: number): string {
  if (score >= 80) {
    return 'Highly Defensible';
  } else if (score >= 60) {
    return 'Evolving';
  } else if (score >= 40) {
    return 'At Risk';
  } else {
    return 'High Disruption';
  }
}

/**
 * Helper function to format salary for display
 */
function formatSalary(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}
