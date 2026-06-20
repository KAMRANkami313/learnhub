import Link from 'next/link';

export default function CourseNotFound() {
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
              <path
                d="M20 4L2 36h36L20 4z"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="20"
                y1="14"
                x2="20"
                y2="24"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="20" cy="29" r="1.5" fill="#ef4444" />
            </svg>
          </div>
        </div>

        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Course Not Found
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          This course doesn&apos;t exist or may have been removed. Check the
          dashboard for available courses.
        </p>

        <Link
          href="/"
          className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{
            background:
              'linear-gradient(135deg, #6366f1, #8b5cf6)',
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}