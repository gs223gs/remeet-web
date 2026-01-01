import { Skeleton } from "@/components/ui/skeleton";

export function TagEditFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-muted bg-card shadow-sm">
        <div className="space-y-6 px-6 py-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="border-t border-border px-6 py-4">
          <div className="flex justify-center">
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-muted bg-card p-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-9 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
