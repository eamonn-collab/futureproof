'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ChatMessage from '@/components/assessment/ChatMessage';
import ChatInput from '@/components/assessment/ChatInput';
import ProgressBar from '@/components/assessment/ProgressBar';
import { useAssessment } from '@/hooks/useAssessment';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    progress,
    phase,
    isLoading,
    isStreaming,
    sendMessage,
    isInitialized,
    error,
  } = useAssessment(sessionId || '');

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Redirect if no session ID
  useEffect(() => {
    if (!sessionId) {
      router.push('/assessment');
    }
  }, [sessionId, router]);

  // Check if assessment is complete and redirect
  useEffect(() => {
    if (phase === 3 && progress === 100 && messages.length > 0) {
      const timer = setTimeout(() => {
        router.push(`/results/${sessionId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, progress, messages.length, sessionId, router]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    await sendMessage(text);
  };

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-5xl">🔭</div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Scout is warming up...
          </p>
          <div className="mt-4 flex justify-center gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" style={{ animationDelay: '0.2s' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Progress bar */}
      <ProgressBar progress={progress} phase={phase} />

      {/* Chat container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {/* Chat messages */}
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex h-40 items-center justify-center">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Scout is getting ready to chat...
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                  isStreaming={isStreaming && index === messages.length - 1}
                />
              ))
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="mx-auto max-w-md rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:border-red-400 dark:bg-red-900/20">
              <p className="text-sm font-medium text-red-700 dark:text-red-300">
                {error}
              </p>
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                Try refreshing the page or start over.
              </p>
            </div>
          )}

          {/* Completion message */}
          {phase === 3 && progress === 100 && (
            <div className="animate-pulse space-y-2 text-center">
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                ✨ Analyzing your results...
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Redirecting you soon!
              </p>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area - fixed on mobile, relative on desktop */}
      <div className="border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading || isStreaming}
            placeholder={
              isLoading ? 'Scout is thinking...' : 'Type your answer...'
            }
          />
        </div>
      </div>
    </div>
  );
}
