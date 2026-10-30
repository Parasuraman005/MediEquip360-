export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-4 animate-pulse shadow-sm">
      <div className="w-full h-48 bg-slate-200 rounded-xl"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
        <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      </div>
      <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}

export function SkeletonDetails() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96 bg-slate-200 rounded-3xl"></div>
        <div className="space-y-4 py-4">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-24 bg-slate-200 rounded-2xl w-full my-6"></div>
          <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
}
