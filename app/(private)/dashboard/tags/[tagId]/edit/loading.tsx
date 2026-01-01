import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { TagEditFormSkeleton } from "@/components/skeletons/TagEditFormSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton actionsCount={3}>
      <TagEditFormSkeleton />
    </DashboardPageSkeleton>
  );
}
