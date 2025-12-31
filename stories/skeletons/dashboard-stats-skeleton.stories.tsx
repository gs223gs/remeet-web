import type { Meta, StoryObj } from "@storybook/react";

import { DashboardStatsSkeleton } from "@/components/skeletons/DashboardStatsSkeleton";

const meta = {
  title: "Skeletons/DashboardStatsSkeleton",
  component: DashboardStatsSkeleton,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardStatsSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
