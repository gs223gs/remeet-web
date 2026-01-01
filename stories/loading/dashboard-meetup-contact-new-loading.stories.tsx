import type { Meta, StoryObj } from "@storybook/react";

import MeetupContactNewLoading from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/new/loading";

const meta = {
  title: "Pages/Dashboard/MeetupContactNewLoading",
  component: MeetupContactNewLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MeetupContactNewLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
