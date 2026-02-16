'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Skill {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  how_to_develop: string;
}

interface SkillsListProps {
  skills: Skill[];
}

function getPriorityColor(priority: string): {
  badge: string;
  bg: string;
  icon: string;
} {
  switch (priority) {
    case 'high':
      return {
        badge: 'bg-red-100 text-red-800 border-red-300',
        bg: 'bg-red-50',
        icon: '🔴',
      };
    case 'medium':
      return {
        badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        bg: 'bg-yellow-50',
        icon: '🟡',
      };
    case 'low':
      return {
        badge: 'bg-green-100 text-green-800 border-green-300',
        bg: 'bg-green-50',
        icon: '🟢',
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-800 border-gray-300',
        bg: 'bg-gray-50',
        icon: '⚪',
      };
  }
}

function getPriorityLabel(priority: string): string {
  switch (priority) {
    case 'high':
      return 'High Priority';
    case 'medium':
      return 'Medium Priority';
    case 'low':
      return 'Nice to Have';
    default:
      return 'Priority';
  }
}

export default function SkillsList({ skills }: SkillsListProps) {
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

  // Sort by priority
  const sortedSkills = [...skills].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] -
      priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  return (
    <div className="space-y-4">
      {sortedSkills.map((skill, idx) => {
        const colors = getPriorityColor(skill.priority);
        const isExpanded = expandedSkill === idx;

        return (
          <div key={idx} className={`${colors.bg} rounded-lg border border-gray-200 overflow-hidden`}>
            <button
              onClick={() =>
                setExpandedSkill(isExpanded ? null : idx)
              }
              className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-black hover:bg-opacity-5 transition-colors text-left"
            >
              {/* Left side */}
              <div className="flex-1 flex items-center gap-3">
                <span className={`${colors.badge} border px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`}>
                  {getPriorityLabel(skill.priority)}
                </span>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  {skill.skill}
                </h3>
              </div>

              {/* Right side - chevron */}
              <div className="flex-shrink-0 ml-4">
                <ChevronDown
                  size={20}
                  className={`text-gray-600 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-5 sm:px-6 py-4 border-t border-gray-300 bg-white">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  How to Develop This Skill
                </h4>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {skill.how_to_develop}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Tips section */}
      <div className="mt-8 p-5 sm:p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span>🎯</span>
          Getting Started
        </h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">1.</span>
            <span>
              <strong>Focus on high-priority skills first</strong> — these are
              essential for career success
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">2.</span>
            <span>
              <strong>Mix learning methods</strong> — combine online courses, real
              projects, and mentorship
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">3.</span>
            <span>
              <strong>Build a portfolio</strong> — showcase your skills with
              real-world projects
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">4.</span>
            <span>
              <strong>Keep learning</strong> — industries evolve, so skills
              development never stops
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
