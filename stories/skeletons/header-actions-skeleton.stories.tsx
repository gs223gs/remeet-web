import type { Meta, StoryObj } from "@storybook/react";

import { HeaderActionsSkeleton } from "@/components/skeletons/HeaderActionsSkeleton";

const meta = {
  title: "Skeletons/HeaderActionsSkeleton",
  component: HeaderActionsSkeleton,
  args: {
    count: 2,
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl rounded-xl border border-dashed border-muted-foreground/40 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeaderActionsSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyActions: Story = {
  args: {
    count: 4,
  },
};
