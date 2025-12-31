import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { MeetupCardGridSkeleton } from "@/components/skeletons/MeetupCardGridSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <MeetupCardGridSkeleton />
    </DashboardPageSkeleton>
  );
}
