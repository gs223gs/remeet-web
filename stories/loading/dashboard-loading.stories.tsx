import type { Meta, StoryObj } from "@storybook/react";

import DashboardLoading from "@/app/(private)/dashboard/loading";

const meta = {
  title: "Pages/Dashboard/Loading",
  component: DashboardLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
