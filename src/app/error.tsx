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
      <div className="text-center max-w-sm">
        {/* Icon */}
        <div className="mb-5">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#ef4444" strokeWidth="1.5" fill="none" />
              <path d="M16 10v8" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16" cy="22" r="1.2" fill="#ef4444" />
            </svg>
          </div>
        </div>

        <h1
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Something Went Wrong
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          An unexpected error occurred. Your data is safe.
        </p>

        {error.message && (
          <div
            className="mb-6 p-3 rounded-xl text-left"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
            }}
          >
            <p
              className="text-[11px] font-mono break-all"
              style={{ color: 'var(--text-muted)' }}
            >
              {error.message}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-indigo-500/20"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/4"
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