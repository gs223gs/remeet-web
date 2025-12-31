import { Skeleton } from "@/components/ui/skeleton";

export function LatestMeetupCardSkeleton() {
  return (
    <div className="rounded-xl border border-muted bg-card">
      <div className="space-y-2 border-b border-border/60 px-6 py-5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48 max-w-full" />
      </div>
      <div className="space-y-4 px-6 py-5">
        <div className="rounded-xl bg-muted/40 px-4 py-3">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="mt-3 h-5 w-48" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-dashed border-muted-foreground/40 px-3 py-2"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-3 w-48 max-w-full" />
        <Skeleton className="h-9 w-40 rounded-lg" />
      </div>
    </div>
  );
}
