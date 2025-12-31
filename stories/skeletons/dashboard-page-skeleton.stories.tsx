import type { Meta, StoryObj } from "@storybook/react";

import { DashboardPageSkeleton } from "@/components/skeletons/DashboardPageSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const meta = {
  title: "Skeletons/DashboardPageSkeleton",
  component: DashboardPageSkeleton,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    ),
  },
  render: (args) => <DashboardPageSkeleton {...args} />,
} satisfies Meta<typeof DashboardPageSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
