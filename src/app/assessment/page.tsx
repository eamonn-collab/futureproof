'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentPage() {
  const router = useRouter();
  const [age, setAge] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCoppaMessage, setShowCoppaMessage] = useState(false);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value);
    setError('');
    setShowCoppaMessage(false);

    if (value && parseInt(value) < 13) {
      setShowCoppaMessage(true);
    }
  };

  const handleStart = async () => {
    const ageNum = parseInt(age);

    if (!age || isNaN(ageNum)) {
      setError('Please enter your age');
      return;
    }

    if (ageNum < 13) {
      setShowCoppaMessage(true);
      setError('');
      return;
    }

    if (ageNum > 99) {
      setError('Please enter a valid age');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: ageNum }),
      });

      if (!response.ok) {
        throw new Error('Failed to create assessment session');
      }

      const data = await response.json();
      router.push(`/assessment/chat?session=${data.sessionId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Try again!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && age && parseInt(age) >= 13) {
      handleStart();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-100/40 to-pink-100/40 dark:from-purple-900/20 dark:to-pink-900/20" />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Scout intro */}
        <div className="mb-8 text-center">
          <div className="mb-6 text-5xl sm:text-6xl">🔭</div>
          <h1 className="text-title mb-2 gradient-text">Hi there!</h1>
          <p className="text-subtitle">
            Before we start, Scout needs to know one thing...
          </p>
        </div>

        {/* Card */}
        <div className="card-elevated mb-6 p-6 sm:p-8">
          {/* Age input */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              How old are you?
            </label>
            <input
              type="number"
              min="1"
              max="99"
              value={age}
              onChange={handleAgeChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your age"
              autoFocus
              className="w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3 text-lg font-semibold text-gray-900 placeholder-gray-400 transition-all focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-purple-800 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-purple-900"
            />
            {error && (
              <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
            )}
          </div>

          {/* COPPA message */}
          {showCoppaMessage && (
            <div className="mb-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:border-amber-400 dark:bg-amber-900/20">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Hey! You need to be at least 13 to use FutureProof. If you're
                interested, ask a parent or guardian to{' '}
                <a
                  href="mailto:hello@futureproof.ai?subject=Parental+Consent"
                  className="underline hover:no-underline"
                >
                  contact us
                </a>{' '}
                for parental consent options.
              </p>
            </div>
          )}

          {/* Button */}
          {!showCoppaMessage ? (
            <button
              onClick={handleStart}
              disabled={!age || isLoading}
              className="btn-primary-hover w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Starting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Let's Go
                  <span className="text-lg">→</span>
                </span>
              )}
            </button>
          ) : (
            <div className="w-full rounded-xl bg-gray-200 px-6 py-3 text-center font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Come back with parental consent
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Scout respects your privacy. We never sell your data.{' '}
          <a href="/privacy" className="hover:text-purple-600">
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
}
