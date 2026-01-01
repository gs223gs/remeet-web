import { ContactCardGridSkeleton } from "@/components/skeletons/ContactCardGridSkeleton";
import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { MeetupOverviewSkeleton } from "@/components/skeletons/MeetupOverviewSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton actionsCount={0}>
      <div className="space-y-6">
        <MeetupOverviewSkeleton />
        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
          <ContactCardGridSkeleton count={6} />
        </section>
      </div>
    </DashboardPageSkeleton>
  );
}
