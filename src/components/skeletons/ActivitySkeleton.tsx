export default function ActivitySkeleton() {
  return (
    <div
      className="rounded-2xl border p-6 h-full"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="animate-shimmer h-5 w-40 rounded mb-6" />
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: 84 }).map((_, i) => (
          <div
            key={i}
            className="animate-shimmer w-full aspect-square rounded-sm"
          />
        ))}
      </div>
    </div>
  );
}