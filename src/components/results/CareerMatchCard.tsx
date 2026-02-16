import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

interface CareerMatchCardProps {
  rank: number;
  title: string;
  defensibilityScore: number;
  matchPercentage: number;
  description: string;
  slug: string;
}

function getDefensibilityColor(
  score: number
): { badge: string; bar: string; text: string } {
  if (score >= 75) {
    return {
      badge: 'bg-green-100 text-green-800 border-green-300',
      bar: 'bg-green-500',
      text: 'Highly Resilient',
    };
  } else if (score >= 50) {
    return {
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      bar: 'bg-yellow-500',
      text: 'Moderately Resilient',
    };
  } else if (score >= 25) {
    return {
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
      bar: 'bg-orange-500',
      text: 'Some Risk',
    };
  } else {
    return {
      badge: 'bg-red-100 text-red-800 border-red-300',
      bar: 'bg-red-500',
      text: 'High Risk',
    };
  }
}

function getRankBadgeColor(rank: number): string {
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

export default function CareerMatchCard({
  rank,
  title,
  defensibilityScore,
  matchPercentage,
  description,
  slug,
}: CareerMatchCardProps) {
  const defensibility = getDefensibilityColor(defensibilityScore);
  const rankColor = getRankBadgeColor(rank);

  return (
    <Link href={`/careers/${slug}`}>
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200">
        <div className="p-5 sm:p-6">
          {/* Top row: Rank and Defensibility Badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className={`${rankColor} w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg`}>
              {rank}
            </div>
            <div className={`${defensibility.badge} border px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap`}>
              <Shield size={16} />
              {defensibilityScore}%
            </div>
          </div>

          {/* Career Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
            {description}
          </p>

          {/* Match Percentage Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                Match Score
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-900">
                {matchPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>

          {/* Defensibility Explanation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">AI Resilience</p>
              <p className="text-sm font-semibold text-gray-700">
                {defensibility.text}
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-blue-600 group-hover:translate-x-2 transition-transform"
            />
          </div>
        </div>

        {/* Visual indicator bar */}
        <div className={`h-1 ${defensibility.bar}`} />
      </div>
    </Link>
  (€