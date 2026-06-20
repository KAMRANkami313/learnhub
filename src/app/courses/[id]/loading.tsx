export default function CourseLoading() {
  return (
    <div className="space-y-6">
      {/* Back link skeleton */}
      <div
        className="animate-shimmer h-4 w-36 rounded"
        style={{ backgroundColor: 'var(--bg-card)' }}
      />

      {/* Course header skeleton */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div
          className="h-1.5 w-full animate-shimmer"
          style={{ backgroundColor: 'rgba(99, 102, 241, 0.3)' }}
        />
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Icon skeleton */}
            <div
              className="w-14 h-14 rounded-2xl animate-shimmer shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div
                  className="h-5 w-20 rounded-full animate-shimmer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                />
              </div>
              <div
                className="h-7 w-64 rounded animate-shimmer"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              />
              <div
                className="h-4 w-96 max-w-full rounded animate-shimmer"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              />
              {/* Progress bar skeleton */}
              <div
                className="h-3 w-full rounded-full animate-shimmer"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
              />
              {/* Stats skeleton */}
              <div className="flex gap-4">
                <div
                  className="h-4 w-16 rounded animate-shimmer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                />
                <div
                  className="h-4 w-28 rounded animate-shimmer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons list skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className="h-8 w-48 rounded-lg animate-shimmer"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          />
          <div
            className="h-8 w-32 rounded-lg animate-shimmer"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="w-6 h-6 rounded-full animate-shimmer"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            />
            <div className="flex-1 space-y-2">
              <div
                className="h-4 w-48 rounded animate-shimmer"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              />
              <div
                className="h-3 w-72 max-w-full rounded animate-shimmer"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div
              className="h-4 w-10 rounded animate-shimmer"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}