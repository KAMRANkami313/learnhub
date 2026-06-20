import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-sm">
        {/* 404 */}
        <div className="mb-6">
          <span className="text-[120px] font-black gradient-text leading-none">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="mb-5">
          <div
            className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#6366f1" strokeWidth="1.5" fill="none" />
              <path d="M12 12l8 8M20 12l-8 8" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-indigo-500/20"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}