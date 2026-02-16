'use client';

import { useState } from 'react';

interface IkigaiData {
  loves: string[];
  goodAt: string[];
  aiResilient: string[];
  earningPotential: string[];
  sweetSpot: string;
}

interface IkigaiDiagramProps {
  ikigaiData: IkigaiData;
}

export default function IkigaiDiagram({ ikigaiData }: IkigaiDiagramProps) {
  const [hoveredCircle, setHoveredCircle] = useState<
    'loves' | 'goodAt' | 'aiResilient' | 'earningPotential' | null
  >(null);

  const circleData = [
    {
      id: 'loves',
      label: 'What You Love',
      color: 'from-purple-400 to-purple-600',
      position: 'top-0 left-0',
      textPosition: 'top-8 left-8',
      icon: '💜',
      items: ikigaiData.loves,
    },
    {
      id: 'goodAt',
      label: 'What You\'re Good At',
      color: 'from-blue-400 to-blue-600',
      position: 'top-0 right-0',
      textPosition: 'top-8 right-8',
      icon: '💙',
      items: ikigaiData.goodAt,
    },
    {
      id: 'aiResilient',
      label: 'AI-Resilient Skills',
      color: 'from-green-400 to-green-600',
      position: 'bottom-0 left-0',
      textPosition: 'bottom-8 left-8',
      icon: '💚',
      items: ikigaiData.aiResilient,
    },
    {
      id: 'earningPotential',
      label: 'Earning Potential',
      color: 'from-yellow-400 to-yellow-600',
      position: 'bottom-0 right-0',
      textPosition: 'bottom-8 right-8',
      icon: '💛',
      items: ikigaiData.earningPotential,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
      {/* SVG-based Ikigai diagram */}
      <div className="relative w-full max-w-2xl mx-auto aspect-square mb-8">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients and filters */}
          <defs>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Top-left circle (Loves) */}
          <circle
            cx="120"
            cy="120"
            r="90"
            fill="url(#purpleGrad)"
            opacity="0.6"
            filter="url(#shadow)"
          />

          {/* Top-right circle (Good At) */}
          <circle
            cx="280"
            cy="120"
            r="90"
            fill="url(#blueGrad)"
            opacity="0.6"
            filter="url(#shadow)"
          />

          {/* Bottom-left circle (AI-Resilient) */}
          <circle
            cx="120"
            cy="280"
            r="90"
            fill="url(#greenGrad)"
            opacity="0.6"
            filter="url(#shadow)"
          />

          {/* Bottom-right circle (Earning Potential) */}
          <circle
            cx="280"
            cy="280"
            r="90"
            fill="url(#yellowGrad)"
            opacity="0.6"
            filter="url(#shadow)"
          />

          {/* Center sweetspot circle */}
          <circle
            cx="200"
            cy="200"
            r="40"
            fill="white"
            stroke="#1f2937"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Labels on circles */}
          <text
            x="60"
            y="110"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            What You
          </text>
          <text
            x="60"
            y="125"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            Love
          </text>

          <text
            x="340"
            y="110"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            What You're
          </text>
          <text
            x="340"
            y="125"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            Good At
          </text>

          <text
            x="60"
            y="305"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            AI-Resilient
          </text>
          <text
            x="60"
            y="320"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            Skills
          </text>

          <text
            x="340"
            y="305"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            Earning
          </text>
          <text
            x="340"
            y="320"
            fontSize="12"
            fontWeight="700"
            fill="#2d3748"
            textAnchor="middle"
            className="pointer-events-none"
          >
            Potential
          </text>

          {/* Center text */}
          <text
            x="200"
            y="205"
            fontSize="14"
            fontWeight="900"
            fill="#1f2937"
            textAnchor="middle"
            className="pointer-events-none"
          >
            🎯 Your Path
          </text>
        </svg>

        {/* Interactive Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-left */}
          <div
            className="absolute top-8 left-8 text-2xl opacity-50"
            onMouseEnter={() => setHoveredCircle('loves')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            💜
          </div>

          {/* Top-right */}
          <div
            className="absolute top-8 right-8 text-2xl opacity-50"
            onMouseEnter={() => setHoveredCircle('goodAt')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            💙
          </div>

          {/* Bottom-left */}
          <div
            className="absolute bottom-8 left-8 text-2xl opacity-50"
            onMouseEnter={() => setHoveredCircle('aiResilient')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            💚
          </div>

          {/* Bottom-right */}
          <div
            className="absolute bottom-8 right-8 text-2xl opacity-50"
            onMouseEnter={() => setHoveredCircle('earningPotential')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            💛
          </div>
        </div>
      </div>

      {/* Details section below diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {circleData.map((circle) => (
          <div
            key={circle.id}
            className="p-4 rounded-lg bg-gray-50 border-2 border-transparent hover:border-gray-300 transition-colors cursor-pointer"
            onMouseEnter={() =>
              setHoveredCircle(circle.id as typeof hoveredCircle)
            }
            onMouseLeave={() => setHoveredCircle(null)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{circle.icon}</span>
              <h3 className="font-bold text-gray-900">{circle.label}</h3>
            </div>
            {circle.items.length > 0 ? (
              <ul className="space-y-1">
                {circle.items.slice(0, 3).map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
                {circle.items.length > 3 && (
                  <li className="text-sm text-gray-500 italic">
                    +{circle.items.length - 3} more
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Based on your quiz responses
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Sweet spot explanation */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Your Sweet Spot: {ikigaiData.sweetSpot}
        </h3>
        <p className="text-gray-700 text-sm">
          This is where your passions, skills, AI resilience, and earning
          potential align. Careers in this area are most likely to be fulfilling
          and future-proof.
        </p>
      </div>
    </div>
  );
}
