'use client';

import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, size = 'md' }) => {
  // Determine color based on score
  let backgroundColor = 'bg-red-500';
  let textColor = 'text-white';

  if (score >= 80) {
    backgroundColor = 'bg-green-500';
  } else if (score >= 60) {
    backgroundColor = 'bg-yellow-500';
  } else if (score >= 40) {
    backgroundColor = 'bg-orange-500';
  }

  // Size classes
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg',
  };

  const fontSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${backgroundColor}
        ${textColor}
        rounded-lg
        flex
        items-center
        justify-center
        font-bold
        shadow-md
        ${fontSizeClasses[size]}
      `}
    >
      {score}
    </div>
  );
};
