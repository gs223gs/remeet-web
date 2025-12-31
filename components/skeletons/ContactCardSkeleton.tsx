import { Skeleton } from "@/components/ui/skeleton";

export function ContactCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-muted bg-card">
      <div className="space-y-4 border-b border-border/60 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
        <div className="rounded-xl bg-muted/40 p-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 text-sm">
        <div className="rounded-xl bg-muted/40 p-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-2 h-5 w-36" />
          <Skeleton className="mt-1 h-3 w-28" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-14" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-muted-foreground/40 p-4">
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}
