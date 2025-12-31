import type { Meta, StoryObj } from "@storybook/react";

import { MeetupFormSkeleton } from "@/components/skeletons/MeetupFormSkeleton";

const meta = {
  title: "Skeletons/MeetupFormSkeleton",
  component: MeetupFormSkeleton,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MeetupFormSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
