export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center">
        {/* Animated logo */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 animate-pulse-glow opacity-50" />
          <div className="relative w-16 h-16 rounded-2xl bg-liner-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2L26 8v12l-12 6L2 20V8l12-6z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M14 2v24M2 8l12 6 12-6M2 20l12-6 12 6"
                stroke="white"
                strokeWidth="0.75"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: '#6366f1',
              animationDelay: '0ms',
            }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: '#8b5cf6',
              animationDelay: '150ms',
            }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: '#ec4899',
              animationDelay: '300ms',
            }}
          />
        </div>

        <p
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          Loading LearnHub...
        </p>
      </div>
    </div>
  );
}