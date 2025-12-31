import type { Meta, StoryObj } from "@storybook/react";

import { DashboardHeaderSkeleton } from "@/components/skeletons/DashboardHeaderSkeleton";

const meta = {
  title: "Skeletons/DashboardHeaderSkeleton",
  component: DashboardHeaderSkeleton,
  args: {
    showDescription: true,
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl rounded-xl border border-dashed border-muted-foreground/40 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DashboardHeaderSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDescription: Story = {
  args: {
    showDescription: false,
  },
};
