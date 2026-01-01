import type { ReactNode } from "react";

import { DashboardHeaderSkeleton } from "@/components/skeletons/DashboardHeaderSkeleton";
import { HeaderActionsSkeleton } from "@/components/skeletons/HeaderActionsSkeleton";

type DashboardPageSkeletonProps = {
  children: ReactNode;
  actionsCount?: number;
};

export function DashboardPageSkeleton({
  children,
  actionsCount = 2, //基本的にaction数が2個だから初期値を2設定
}: DashboardPageSkeletonProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <DashboardHeaderSkeleton />
        <HeaderActionsSkeleton count={actionsCount} />
      </div>

      {children}
    </div>
  );
}
