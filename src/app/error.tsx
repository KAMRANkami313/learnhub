'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-md">
        {/* Error icon */}
        <div className="mb-6">
          <div
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="14"
                y1="14"
                x2="26"
                y2="26"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="14"
                x2="14"
                y2="26"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Something Went Wrong
        </h1>
        <p
          className="text-sm mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          An unexpected error occurred. Don&apos;t worry, your data is safe.
        </p>

        {/* Error details (collapsible) */}
        {error.message && (
          <div
            className="mb-6 p-3 rounded-lg text-left"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
            }}
          >
            <p
              className="text-xs font-mono break-all"
              style={{ color: 'var(--text-muted)' }}
            >
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background:
                'linear-gradient(135deg, #6366f1, #8b5cf6)',
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}