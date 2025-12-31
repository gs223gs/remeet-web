import type { Meta, StoryObj } from "@storybook/react";

import { ContactCardGridSkeleton } from "@/components/skeletons/ContactCardGridSkeleton";

const meta = {
  title: "Skeletons/ContactCardGridSkeleton",
  component: ContactCardGridSkeleton,
  args: {
    count: 6,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ContactCardGridSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DenseGrid: Story = {
  args: {
    count: 12,
  },
};
