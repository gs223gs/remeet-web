import { Skeleton } from "@/components/ui/skeleton";

type TagsGridSkeletonProps = {
  count?: number;
};

export function TagsGridSkeleton({ count = 6 }: TagsGridSkeletonProps) {
  return (
    <div className="rounded-xl border border-muted bg-card">
      <div className="space-y-2 border-b border-border/60 p-5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
      <div className="p-5">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-dashed border-muted-foreground/30 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
