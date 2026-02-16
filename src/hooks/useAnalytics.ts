'use client';

import { useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

/**
 * Hook for tracking analytics events
 * Usage:
 * const { trackEvent } = useAnalytics();
 * trackEvent('assessment_started', { step: 1 });
 */
export const useAnalytics = () => {
  const trackEvent = useCallback(async (event: string, properties?: Record<string, any>) => {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          properties,
          timestamp: new Date().toISOString(),
        } as AnalyticsEvent),
      });

      if (!response.ok) {
        console.error('Analytics error:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, []);

  return { trackEvent };
};
