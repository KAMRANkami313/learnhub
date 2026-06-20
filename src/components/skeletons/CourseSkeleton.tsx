export default function CourseSkeleton() {
  return (
    <div
      className="rounded-2xl border p-5 h-full"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="animate-shimmer w-10 h-10 rounded-xl" />
        <div className="flex-1">
          <div className="animate-shimmer h-4 w-32 rounded mb-2" />
          <div className="animate-shimmer h-3 w-20 rounded" />
        </div>
      </div>
      <div className="animate-shimmer h-2 w-full rounded-full mb-3" />
      <div className="flex justify-between">
        <div className="animate-shimmer h-3 w-16 rounded" />
        <div className="animate-shimmer h-3 w-12 rounded" />
      </div>
    </div>
  );
}