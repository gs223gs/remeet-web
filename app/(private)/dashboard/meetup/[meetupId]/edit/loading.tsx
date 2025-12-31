import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { MeetupFormSkeleton } from "@/components/skeletons/MeetupFormSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <MeetupFormSkeleton />
    </DashboardPageSkeleton>
  );
}
