import type { Meta, StoryObj } from "@storybook/react";

import { MeetupOverviewSkeleton } from "@/components/skeletons/MeetupOverviewSkeleton";

const meta = {
  title: "Skeletons/MeetupOverviewSkeleton",
  component: MeetupOverviewSkeleton,
} satisfies Meta<typeof MeetupOverviewSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
