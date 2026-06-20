export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center">
        {/* Animated logo */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse-glow opacity-40" />
          <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14 2L26 8v12l-12 6L2 20V8l12-6z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M14 2v24M2 8l12 6 12-6"
                stroke="white"
                strokeWidth="0.75"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: '800ms',
              }}
            />
          ))}
        </div>

        <p
          className="text-xs font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          Loading LearnHub
        </p>
      </div>
    </div>
  );
}