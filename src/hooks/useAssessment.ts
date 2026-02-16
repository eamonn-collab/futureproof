import { useState, useEffect, useCallback, useRef } from 'react';

export interface Message {
  role: 'scout' | 'user';
  content: string;
  timestamp: number;
}

interface UseAssessmentReturn {
  messages: Message[];
  progress: number;
  phase: 1 | 2 | 3;
  isLoading: boolean;
  isStreaming: boolean;
  sendMessage: (text: string) => Promise<void>;
  isInitialized: boolean;
  error: string | null;
}

const STORAGE_KEY_PREFIX = 'futureproof_assessment_';

export function useAssessment(sessionId: string): UseAssessmentReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize assessment from storage or API
  useEffect(() => {
    if (!sessionId) return;

    const initializeAssessment = async () => {
      try {
        setError(null);

        // Try to load from localStorage first
        const storageKey = `${STORAGE_KEY_PREFIX}${sessionId}`;
        const stored = localStorage.getItem(storageKey);

        if (stored) {
          const data = JSON.parse(stored);
          setMessages(data.messages || []);
          setProgress(data.progress || 0);
          setPhase(data.phase || 1);
        } else {
          // Load from API (get initial Scout message)
          const response = await fetch(
            `/api/assessment/${sessionId}/chat`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: '__init__' }),
            }
          );

          if (!response.ok) {
            throw new Error('Failed to initialize assessment');
          }

          const data = await response.json();
          const initialMessage: Message = {
            role: 'scout',
            content: data.initialMessage,
            timestamp: Date.now(),
          };
          setMessages([initialMessage]);
          setProgress(data.progress || 10);
          setPhase(data.phase || 1);
        }

        setIsInitialized(true);
      } catch (err) {
        console.error('Assessment initialization error:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to start assessment'
        );
        setIsInitialized(true);
      }
    };

    initializeAssessment();
  }, [sessionId]);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      const storageKey = `${STORAGE_KEY_PREFIX}${sessionId}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({ messages, progress, phase })
      );
    }
  }, [sessionId, messages, progress, phase]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!sessionId || !text.trim()) return;

      try {
        setError(null);
        setIsLoading(true);

        // Add user message to history
        const userMessage: Message = {
          role: 'user',
          content: text,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage]);

        // Create abort controller for this request
        abortControllerRef.current = new AbortController();

        // Send to API with streaming
        const response = await fetch(
          `/api/assessment/${sessionId}/chat`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to get response from Scout');
        }

        setIsStreaming(true);
        setIsLoading(false);

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let scoutMessage = '';
        let scoutPhase: 1 | 2 | 3 = phase;
        let scoutProgress = progress;
        const messageChunks: string[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.content) {
                  scoutMessage += data.content;
                  messageChunks.push(data.content);

                  // Update streaming message
                  setMessages((prev) => {
                    const updated = [...prev];
                    if (updated[updated.length - 1]?.role === 'scout') {
                      updated[updated.length - 1].content = scoutMessage;
                    } else {
                      updated.push({
                        role: 'scout',
                        content: scoutMessage,
                        timestamp: Date.now(),
                      });
                    }
                    return updated;
                  });
                }

                if (data.phase !== undefined) {
                  scoutPhase = data.phase;
                  setPhase(data.phase);
                }

                if (data.progress !== undefined) {
                  scoutProgress = data.progress;
                  setProgress(data.progress);
                }

                if (data.isComplete) {
                  // Assessment is complete, redirect will be handled in the page
                  setPhase(3);
                  setProgress(100);
                }
              } catch (e) {
                // Skip non-JSON lines
              }
            }
          }
        }

        setIsStreaming(false);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Send message error:', err);
          setError(err.message || 'Failed to send message');
          setIsStreaming(false);
        }
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [sessionId, phase, progress]
  );

  return {
    messages,
    progress,
    phase,
    isLoading,
    isStreaming,
    sendMessage,
    isInitialized,
    error,
  };
}
