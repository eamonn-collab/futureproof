interface ChatMessageProps {
  role: 'scout' | 'user';
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({
  role,
  content,
  isStreaming = false,
}: ChatMessageProps) {
  const isScout = role === 'scout';

  return (
    <div
      className={`message-enter flex ${
        isScout ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg ${
          isScout
            ? 'rounded-2xl rounded-tl-sm bg-gradient-to-br from-purple-100 to-purple-50 px-4 py-3 text-gray-900 dark:from-purple-900/40 dark:to-purple-800/20 dark:text-gray-100'
            : 'rounded-2xl rounded-tr-sm bg-gradient-to-br from-purple-600 to-purple-500 px-4 py-3 text-white shadow-md dark:from-purple-700 dark:to-purple-600'
        }`}
      >
        <div className="text-sm leading-relaxed sm:text-base">
          {content}
          {isStreaming && (
            <span className="streaming-indicator ml-1 inline-block">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>
                .
              </span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>
                .
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Scout avatar */}
      {isScout && (
        <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-lg dark:bg-purple-900/50">
          🔭
        </div>
      )}
    </div>
  );
}
