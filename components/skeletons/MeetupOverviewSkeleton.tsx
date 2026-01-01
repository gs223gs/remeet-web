import { Skeleton } from "@/components/ui/skeleton";

export function MeetupOverviewSkeleton() {
  return (
    <div className="rounded-xl border border-muted bg-card shadow-sm">
      <div className="space-y-3 border-b border-border px-6 py-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-4 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-muted/40 px-4 py-3 space-y-2"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-dashed border-muted-foreground/40 px-4 py-4 space-y-3">
          <Skeleton className="h-5 w-40" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-32 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
