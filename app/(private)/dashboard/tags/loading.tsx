import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { TagsGridSkeleton } from "@/components/skeletons/TagsGridSkeleton";
import { TagsOverviewSkeleton } from "@/components/skeletons/TagsOverviewSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <section className="flex flex-col gap-6">
        <TagsOverviewSkeleton />
        <TagsGridSkeleton />
      </section>
    </DashboardPageSkeleton>
  );
}
