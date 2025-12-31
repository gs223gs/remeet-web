import { Skeleton } from "@/components/ui/skeleton";

export function MeetupCardSkeleton() {
  return (
    <div className="rounded-xl border border-muted bg-card p-4 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-xl bg-muted/40 p-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-5 w-32" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-dashed border-muted-foreground/40 p-3">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  );
}
