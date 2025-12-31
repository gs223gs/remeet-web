import { ContactCardGridSkeleton } from "@/components/skeletons/ContactCardGridSkeleton";
import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <section className="space-y-4">
        <ContactCardGridSkeleton />
      </section>
    </DashboardPageSkeleton>
  );
}
