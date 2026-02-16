import { Career } from '@/types/career';
import { SCORE_BANDS } from '@/lib/constants';

export interface CareerMatch {
  career: Career;
  matchScore: number;
  defensibilityScore: number;
  reasoning: string;
}

export class CareerMatcher {
  /**
   * Matches and ranks careers by primary and secondary archetype alignment,
   * combined with defensibility score
   */
  static matchCareers(
    primaryArchetype: string,
    secondaryArchetype: string | null,
    allCareers: Career[],
    limit: number = 5
  ): CareerMatch[] {
    // Filter careers by primary archetype first
    const primaryMatches = allCareers.filter(
      (career) => career.primary_archetype === primaryArchetype
    );

    // Add secondary archetype matches if no primary matches found
    let candidateCareers = primaryMatches;
    if (candidateCareers.length === 0 && secondaryArchetype) {
      candidateCareers = allCareers.filter(
        (career) => career.primary_archetype === secondaryArchetype
      );
    }

    // Score each career
    const scored = candidateCareers.map((career) => {
      let archetypeAlignment = 0;

      if (career.primary_archetype === primaryArchetype) {
        archetypeAlignment = 1.0;
      } else if (career.secondary_archetype === primaryArchetype) {
        archetypeAlignment = 0.8;
      } else if (career.primary_archetype === secondaryArchetype) {
        archetypeAlignment = 0.5;
      } else if (career.secondary_archetype === secondaryArchetype) {
        archetypeAlignment = 0.3;
      }

      // Normalize defensibility score to 0-1
      const defensibilityNormalized = Math.max(0, Math.min(1, career.defensibility_score / 100));

      // Combined score: 60% archetype alignment, 40% defensibility
      const matchScore =
        archetypeAlignment * 0.6 + defensibilityNormalized * 0.4;

      const reasoning = `${career.primary_archetype} archetype with ${career.defensibility_score}/100 defensibility rating`;

      return {
        career,
        matchScore,
        defensibilityScore: career.defensibility_score,
        reasoning,
      };
    });

    // Sort by match score and return top N
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Finds careers that match the user's archetype but have LOW defensibility scores
   */
  static findPathsToAvoid(
    primaryArchetype: string,
    allCareers: Career[],
    limit: number = 3
  ): { career: Career; reason: string }[] {
    // Find careers that match primary archetype but have low defensibility
    const atRiskCareers = allCareers.filter(
      (career) =>
        (career.primary_archetype === primaryArchetype ||
          career.secondary_archetype === primaryArchetype) &&
        career.defensibility_score < 50
    );

    // Sort by defensibility score (lowest first)
    const sorted = atRiskCareers.sort(
      (a, b) => a.defensibility_score - b.defensibility_score
    );

    // Return top N with reasoning
    return sorted.slice(0, limit).map((career) => {
      const automationRisk = 100 - career.defensibility_score;
      return {
        career,
        reason: `Matches your interests but ${automationRisk}% of core tasks are becoming automated. Consider upskilling in higher-defensibility areas.`,
      };
    });
  }

  /**
   * Returns the score band for a given defensibility score
   */
  static getScoreBand(
    score: number
  ): { label: string; description: string; color: string } {
    const band = SCORE_BANDS.find((b) => score >= b.min && score <= b.max);

    if (band) {
      return {
        label: band.label,
        description: band.description,
        color: band.color,
      };
    }

    // Default to high disruption if score is out of range
    return {
      label: 'High Disruption',
      description:
        'This career is at high risk of disruption and significant change is likely within the next decade.',
      color: '#EF4444',
    };
  }
}
