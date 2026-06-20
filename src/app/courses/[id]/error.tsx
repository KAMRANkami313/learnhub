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
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
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
                stroke="#f59e0b"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="20"
                y1="12"
                x2="20"
                y2="22"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="20" cy="27" r="1.5" fill="#f59e0b" />
            </svg>
          </div>
        </div>

        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Failed to Load Course
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          There was a problem loading this course. This might be a temporary
          issue with the database connection.
        </p>

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
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}