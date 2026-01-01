import { Skeleton } from "@/components/ui/skeleton";

export function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-muted bg-card shadow-sm">
        <div className="space-y-6 border-b border-border px-6 py-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-44" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-10 w-full rounded-lg md:col-span-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg md:col-span-2" />
          </div>
        </div>
        <div className="space-y-4 border-b border-border px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-7 w-20 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-4 px-6 py-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-56" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>
    </div>
  );
}
