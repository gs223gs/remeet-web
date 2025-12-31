import type { ReactNode } from "react";

import { DashboardHeaderSkeleton } from "@/components/skeletons/DashboardHeaderSkeleton";
import { HeaderActionsSkeleton } from "@/components/skeletons/HeaderActionsSkeleton";

type DashboardPageSkeletonProps = {
  children: ReactNode;
};

export function DashboardPageSkeleton({
  children,
}: DashboardPageSkeletonProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex justify-between">
        <DashboardHeaderSkeleton />
        <HeaderActionsSkeleton />
      </div>

      {children}
    </div>
  );
}
