export default function CourseSkeleton() {
  return (
    <div className="rounded-2xl glass overflow-hidden">
      <div className="h-0.5 w-full animate-shimmer" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="animate-shimmer w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="animate-shimmer h-4 w-32 rounded" />
            <div className="animate-shimmer h-3 w-20 rounded" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="animate-shimmer h-3 w-full rounded" />
          <div className="animate-shimmer h-3 w-3/4 rounded" />
        </div>
        <div className="animate-shimmer h-1.5 w-full rounded-full" />
        <div className="flex justify-between">
          <div className="animate-shimmer h-3 w-16 rounded" />
          <div className="animate-shimmer h-3 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}