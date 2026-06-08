import { Skeleton } from "@/components/ui/skeleton";

function LoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white">
      {/* Navbar skeleton */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <Skeleton className="h-8 w-32 bg-zinc-800" />
        <div className="flex gap-3">
          <Skeleton className="h-8 w-20 bg-zinc-800" />
          <Skeleton className="h-8 w-20 bg-zinc-800" />
          <Skeleton className="h-8 w-20 bg-zinc-800" />
        </div>
      </div>

      {/* Page title */}
      <div className="p-6">
        <Skeleton className="h-10 w-1/3 bg-zinc-800" />
        <Skeleton className="h-4 w-1/2 bg-zinc-800 mt-2" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* product image */}
            <Skeleton className="h-48 w-full bg-zinc-800 rounded-xl" />

            {/* title */}
            <Skeleton className="h-4 w-3/4 bg-zinc-800" />

            {/* price */}
            <Skeleton className="h-4 w-1/3 bg-zinc-800" />

            {/* button */}
            <Skeleton className="h-10 w-full bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingScreen;
