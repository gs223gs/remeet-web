import type { Meta, StoryObj } from "@storybook/react";

import MeetupDetailLoading from "@/app/(private)/dashboard/meetup/[meetupId]/loading";

const meta = {
  title: "Pages/Dashboard/MeetupDetailLoading",
  component: MeetupDetailLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MeetupDetailLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
