import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="max-w-7xl w-full mx-auto py-8 px-2 md:px-4">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          <Skeleton className="h-8 w-40" />
        </h2>
        <div className="border rounded-md overflow-hidden">
          {/* Table header */}
          <div className="flex bg-muted px-4 py-2 font-semibold">
            <div className="w-1/4">
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="w-2/4">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="w-1/4">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          {/* Table rows */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center px-4 py-3 border-t">
              <div className="w-1/4">
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="w-2/4 flex items-center gap-2">
                {/* Avatar skeleton for image row */}
                {i === 2 ? (
                  <Skeleton className="h-10 w-10 rounded-full" />
                ) : (
                  <Skeleton className="h-5 w-32" />
                )}
              </div>
              <div className="w-1/4 flex justify-end">
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
