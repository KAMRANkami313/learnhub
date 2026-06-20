export default function ActivitySkeleton() {
  return (
    <div className="rounded-2xl glass col-span-1 md:col-span-3">
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="animate-shimmer h-3 w-28 rounded" />
            <div className="animate-shimmer h-4 w-48 rounded" />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-shimmer w-2.75 h-2.75 rounded-[3px]" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-0.75">
          {Array.from({ length: 84 }).map((_, i) => (
            <div
              key={i}
              className="animate-shimmer w-full aspect-square rounded-[3px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}