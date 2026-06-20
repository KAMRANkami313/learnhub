import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-6">
          <span className="text-8xl font-bold gradient-text">404</span>
        </div>

        {/* Illustration */}
        <div className="mb-6">
          <div
            className="w-24 h-24 mx-auto rounded-2xl border flex items-center justify-center"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M18 20v-2a6 6 0 1112 0v2"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="18" cy="26" r="2" fill="#6366f1" />
              <circle cx="30" cy="26" r="2" fill="#6366f1" />
              <path
                d="M20 32c0 0 2 3 4 3s4-3 4-3"
                stroke="#ec4899"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background:
                'linear-gradient(135deg, #6366f1, #8b5cf6)',
            }}
          >
            Back to Dashboard
          </Link>
          <Link
            href="/courses"
            className="px-6 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}