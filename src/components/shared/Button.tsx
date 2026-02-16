'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant styles
  const variantClasses = {
    primary:
      'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary:
      'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 active:bg-purple-100 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-purple-600 hover:bg-purple-50 active:bg-purple-100 disabled:text-gray-400 disabled:cursor-not-allowed',
  };

  // Base styles
  const baseClasses =
    'rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2';

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // If href is provided, render as a link
  if (href) {
    return (
      <Link href={href}>
        <button
          type={type}
          disabled={disabled}
          className={combinedClasses}
        >
          {children}
        </button>
      </Link>
    );
  }

  // Otherwise render as a button
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};
