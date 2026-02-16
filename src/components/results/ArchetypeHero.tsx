'use client';

import { useEffect, useState } from 'react';

interface ArchetypeHeroProps {
  name: string;
  emoji: string;
  coreDrive: string;
  motto: string;
  color: string;
}

const colorGradients: Record<string, { from: string; to: string; accent: string }> = {
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

export default function ArchetypeHero({
  name,
  emoji,
  coreDrive,
  motto,
  color,
}: ArchetypeHeroProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const gradient = colorGradients[color.toLowerCase()] || colorGradients.blue;

  useEffect(() => {
    // Animation plays on mount
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-gradient-to-b ${gradient.from} ${gradient.to} text-white py-16 sm:py-24 relative overflow-hidden`}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Emoji with celebration animation */}
        <div
          className={`mb-6 text-8xl sm:text-9xl transition-all duration-700 ${
            isAnimating ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            animation: isAnimating
              ? 'bounce 0.6s ease-out, fadeInScale 0.6s ease-out'
              : 'none',
          }}
        >
          {emoji}
        </div>

        {/* Main headline */}
        <div className="mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 leading-tight">
            You're a{' '}
            <span
              className={`${gradient.accent} px-4 py-2 rounded-lg inline-block mt-2`}
            >
              {name}
            </span>
            !
          </h1>
        </div>

        {/* Core drive */}
        <p className="text-lg sm:text-xl text-white text-opacity-90 mb-6 max-w-2xl mx-auto leading-relaxed">
          {coreDrive}
        </p>

        {/* Motto */}
        <div className="mt-8 pt-6 border-t border-white border-opacity-30">
          <p className="text-base sm:text-lg italic text-white text-opacity-80 mb-2">
            Your Motto
          </p>
          <p className="text-xl sm:text-2xl font-bold">"{motto}"</p>
        </div>

        {/* Celebration particles animation */}
        {isAnimating && (
          <>
            <div className="absolute top-1/4 left-10 text-4xl animate-float animation-delay-0">
              ✨
            </div>
            <div className="absolute top-1/3 right-10 text-4xl animate-float animation-delay-1000">
              🎯
            </div>
            <div className="absolute bottom-1/4 left-1/4 text-4xl animate-float animation-delay-500">
              🚀
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translateY(30px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.75);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-0 {
          animation-delay: 0s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </diw>
  );
}
