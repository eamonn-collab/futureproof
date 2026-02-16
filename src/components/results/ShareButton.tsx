'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonProps {
  sessionId: string;
  archetypeName: string;
}

export default function ShareButton({
  sessionId,
  archetypeName,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${sessionId}`;
  const shareText = `I'm a ${archetypeName} on FutureProof! 🚀 Discover your AI-resilient career path. Take the quiz now!`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'FutureProof Career Quiz',
          text: shareText,
          url: shareUrl,
        });
        setShared(true);
        // Track analytics
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'share_results',
            session_id: sessionId,
            archetype: archetypeName,
          }),
        }).catch(() => {
          // Silently fail analytics
        });
        setTimeout(() => setShared(false), 2000);
      } else {
        // Fallback to copy link
        handleCopyLink();
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      // Track analytics
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'copy_results_link',
          session_id: sessionId,
          archetype: archetypeName,
        }),
      }).catch(() => {
        // Silently fail analytics
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShareToSocial = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offset/?url=${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');

    // Track analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'share_social',
        platform,
        session_id: sessionId,
        archetype: archetypeName,
      }),
    }).catch(() => {
      // Silently fail analytics
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main share buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Native share button */}
        <button
          onClick={handleShare}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            shared
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {shared ? (
            <>
              <Check size={20} />
              Shared!
            </>
          ) : (
            <>
              <Share2 size={20} />
              Share Results
            </>
          )}
        </button>

        {/* Copy link button */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          {copied ? (
            <>
              <Check size={20} />
              Copied!
            </>
          ) : (
            <>
              <LinkIcon size={20} />
              Copy Link
            </>
          )}
        </button>
      </div>

      {/* Social share buttons */}
      <div className="border-t pt-4">
        <p className="text-gray-600 text-sm mb-3 text-center">
          Or share on social media
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => handleShareToSocial('twitter')}
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            𝕏
          </button>
          <button
            onClick={() => handleShareToSocial('facebook')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            Facebook
          </button>
          <button
            onClick={() => handleShareToSocial('linkedin')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            LinkedIn
          </button>
        </div>
      </div>

      {/* Info text */}
      <p className="text-gray-600 text-xs sm:text-sm text-center">
        Share with friends and family to help them discover their career paths!
      </p>
    </div>
  );
}
