import type { Meta, StoryObj } from "@storybook/react";

import { TagEditFormSkeleton } from "@/components/skeletons/TagEditFormSkeleton";

const meta = {
  title: "Skeletons/TagEditFormSkeleton",
  component: TagEditFormSkeleton,
} satisfies Meta<typeof TagEditFormSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
