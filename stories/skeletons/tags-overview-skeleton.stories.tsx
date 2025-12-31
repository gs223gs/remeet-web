import type { Meta, StoryObj } from "@storybook/react";

import { TagsOverviewSkeleton } from "@/components/skeletons/TagsOverviewSkeleton";

const meta = {
  title: "Skeletons/TagsOverviewSkeleton",
  component: TagsOverviewSkeleton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TagsOverviewSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
