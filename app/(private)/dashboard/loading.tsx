import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { DashboardStatsSkeleton } from "@/components/skeletons/DashboardStatsSkeleton";
import { LatestMeetupCardSkeleton } from "@/components/skeletons/LatestMeetupCardSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <section className="flex flex-col gap-6">
        <DashboardStatsSkeleton />
        <LatestMeetupCardSkeleton />
      </section>
    </DashboardPageSkeleton>
  );
}
