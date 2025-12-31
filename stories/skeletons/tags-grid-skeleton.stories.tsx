import type { Meta, StoryObj } from "@storybook/react";

import { TagsGridSkeleton } from "@/components/skeletons/TagsGridSkeleton";

const meta = {
  title: "Skeletons/TagsGridSkeleton",
  component: TagsGridSkeleton,
  args: {
    count: 6,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TagsGridSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Extended: Story = {
  args: {
    count: 12,
  },
};
