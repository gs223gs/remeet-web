import type { Meta, StoryObj } from "@storybook/react";

import { MeetupCardSkeleton } from "@/components/skeletons/MeetupCardSkeleton";

const meta = {
  title: "Skeletons/MeetupCardSkeleton",
  component: MeetupCardSkeleton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MeetupCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
