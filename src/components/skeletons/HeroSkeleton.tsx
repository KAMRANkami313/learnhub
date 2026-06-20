export default function HeroSkeleton() {
  return (
    <div className="rounded-2xl glass col-span-1 md:col-span-2">
      <div className="p-5 sm:p-6 space-y-4">
        <div className="animate-shimmer h-5 w-28 rounded-full" />
        <div className="animate-shimmer h-8 w-56 rounded-lg" />
        <div className="animate-shimmer h-4 w-80 max-w-full rounded" />
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border p-3 space-y-2"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="animate-shimmer w-7 h-7 rounded-lg" />
              <div className="animate-shimmer h-5 w-12 rounded" />
              <div className="animate-shimmer h-3 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}