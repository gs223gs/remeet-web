import type { Meta, StoryObj } from "@storybook/react";

import { ContactDetailSkeleton } from "@/components/skeletons/ContactDetailSkeleton";

const meta = {
  title: "Skeletons/ContactDetailSkeleton",
  component: ContactDetailSkeleton,
} satisfies Meta<typeof ContactDetailSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
