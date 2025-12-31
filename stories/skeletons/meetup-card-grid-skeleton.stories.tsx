import type { Meta, StoryObj } from "@storybook/react";

import { MeetupCardGridSkeleton } from "@/components/skeletons/MeetupCardGridSkeleton";

const meta = {
  title: "Skeletons/MeetupCardGridSkeleton",
  component: MeetupCardGridSkeleton,
  args: {
    count: 5,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MeetupCardGridSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WideGrid: Story = {
  args: {
    count: 10,
  },
};
