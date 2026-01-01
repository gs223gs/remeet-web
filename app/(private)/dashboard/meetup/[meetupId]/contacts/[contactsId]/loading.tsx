import { ContactDetailSkeleton } from "@/components/skeletons/ContactDetailSkeleton";
import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <ContactDetailSkeleton />
    </DashboardPageSkeleton>
  );
}
