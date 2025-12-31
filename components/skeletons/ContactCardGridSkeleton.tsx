import { ContactCardSkeleton } from "@/components/skeletons/ContactCardSkeleton";

type ContactCardGridSkeletonProps = {
  count?: number;
};

export function ContactCardGridSkeleton({
  count = 12,
}: ContactCardGridSkeletonProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <ContactCardSkeleton key={index} />
      ))}
    </div>
  );
}
