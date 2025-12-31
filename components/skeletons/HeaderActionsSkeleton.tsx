import { Skeleton } from "@/components/ui/skeleton";

type HeaderActionsSkeletonProps = {
  count?: number;
};

export function HeaderActionsSkeleton({
  count = 2,
}: HeaderActionsSkeletonProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-32" />
      ))}
    </div>
  );
}
