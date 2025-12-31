import { Skeleton } from "@/components/ui/skeleton";

export function TagsOverviewSkeleton() {
  return (
    <div className="rounded-xl border border-muted bg-card p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
