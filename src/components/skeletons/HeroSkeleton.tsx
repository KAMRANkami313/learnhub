export default function HeroSkeleton() {
  return (
    <div
      className="rounded-2xl border p-6 h-full"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="animate-shimmer h-6 w-40 rounded-md mb-4" />
      <div className="animate-shimmer h-10 w-64 rounded-md mb-6" />
      <div className="flex gap-4">
        <div className="animate-shimmer h-16 w-16 rounded-xl" />
        <div className="animate-shimmer h-16 w-16 rounded-xl" />
        <div className="animate-shimmer h-16 w-16 rounded-xl" />
      </div>
    </div>
  );
}