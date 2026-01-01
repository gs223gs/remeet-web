import { Skeleton } from "@/components/ui/skeleton";

export function ContactDetailSkeleton() {
  return (
    <div className="rounded-xl border border-muted bg-card shadow-sm">
      <div className="border-b border-border px-6 py-6">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="space-y-6 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-muted/40 px-4 py-3 space-y-2"
            >
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-dashed border-muted-foreground/40 px-3 py-3"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="mt-2 h-3 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
