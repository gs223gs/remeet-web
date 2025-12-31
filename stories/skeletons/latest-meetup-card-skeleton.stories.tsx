import type { Meta, StoryObj } from "@storybook/react";

import { LatestMeetupCardSkeleton } from "@/components/skeletons/LatestMeetupCardSkeleton";

const meta = {
  title: "Skeletons/LatestMeetupCardSkeleton",
  component: LatestMeetupCardSkeleton,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LatestMeetupCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
