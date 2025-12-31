import { Skeleton } from "@/components/ui/skeleton";

export function MeetupFormSkeleton() {
  return (
    <section className="rounded-xl border border-muted bg-card p-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-48 rounded-lg" />
          <div className="rounded-lg border border-dashed border-muted-foreground/40 p-4">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-full rounded-md" />
              ))}
            </div>
            <Skeleton className="mt-4 h-9 w-32 rounded-lg" />
          </div>
        </div>

        <Skeleton className="h-11 w-full rounded-lg sm:w-48" />
      </div>
    </section>
  );
}
