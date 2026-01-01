import { ContactFormSkeleton } from "@/components/skeletons/ContactFormSkeleton";
import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";

export default function Loading() {
  return (
    <DashboardPageSkeleton>
      <ContactFormSkeleton />
    </DashboardPageSkeleton>
  );
}
