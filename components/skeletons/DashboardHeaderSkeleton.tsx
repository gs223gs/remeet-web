import { Skeleton } from "@/components/ui/skeleton";

type DashboardHeaderSkeletonProps = {
  showDescription?: boolean;
};

export function DashboardHeaderSkeleton({
  showDescription = true,
}: DashboardHeaderSkeletonProps) {
  return (
    <div className="flex flex-col gap-4 pb-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <Skeleton className="h-3 w-32 rounded-full" />
        <Skeleton className="h-8 w-48" />
        {showDescription && <Skeleton className="h-4 w-72 max-w-full" />}
      </div>
    </div>
  );
}
