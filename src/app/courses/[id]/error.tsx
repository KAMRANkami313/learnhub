'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CourseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Course page error:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-sm">
        <div className="mb-5">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              <path d="M16 10v8" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16" cy="22" r="1.2" fill="#f59e0b" />
            </svg>
          </div>
        </div>

        <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Failed to Load Course
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          A temporary database connection issue. Please try again.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-indigo-500/20"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/4"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}