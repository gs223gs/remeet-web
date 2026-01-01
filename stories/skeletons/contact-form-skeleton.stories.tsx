import type { Meta, StoryObj } from "@storybook/react";

import { ContactFormSkeleton } from "@/components/skeletons/ContactFormSkeleton";

const meta = {
  title: "Skeletons/ContactFormSkeleton",
  component: ContactFormSkeleton,
} satisfies Meta<typeof ContactFormSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
