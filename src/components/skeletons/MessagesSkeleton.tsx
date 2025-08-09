import { Skeleton } from "@/components/ui/skeleton";

export function MessagesSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-80 mb-4" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-card rounded-lg border">
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
      {/* Table header */}
      <div className="flex bg-muted px-4 py-2 font-semibold rounded-t-md">
        <div className="w-1/6">
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="w-2/6">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="w-1/6">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="w-1/6">
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="w-1/6">
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="w-1/6">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      {/* Table rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center px-4 py-3 border-t">
          <div className="w-1/6">
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="w-2/6">
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="w-1/6 flex gap-1">
            {[...Array(3)].map((_, j) => (
              <Skeleton key={j} className="h-5 w-12 rounded-full" />
            ))}
          </div>
          <div className="w-1/6">
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="w-1/6">
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="w-1/6 flex gap-2 justify-end">
            {[...Array(3)].map((_, j) => (
              <Skeleton key={j} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
