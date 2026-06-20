import Link from 'next/link';

export default function CourseNotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-sm">
        <div className="mb-5">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L2 28h28L16 4z" stroke="#ef4444" strokeWidth="1.5" fill="none" />
              <path d="M16 14v6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16" cy="23" r="1.2" fill="#ef4444" />
            </svg>
          </div>
        </div>

        <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Course Not Found
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          This course doesn&apos;t exist or may have been removed.
        </p>

        <Link
          href="/"
          className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-indigo-500/20"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}