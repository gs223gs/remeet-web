import { MeetupCardSkeleton } from "@/components/skeletons/MeetupCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type MeetupCardGridSkeletonProps = {
  count?: number;
};

export function MeetupCardGridSkeleton({
  count = 5,
}: MeetupCardGridSkeletonProps) {
  return (
    <section className="space-y-4">
      <Skeleton className="h-4 w-24" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, index) => (
          <MeetupCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
