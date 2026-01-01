import type { Meta, StoryObj } from "@storybook/react";

import MeetupContactDetailLoading from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/[contactsId]/loading";

const meta = {
  title: "Pages/Dashboard/MeetupContactDetailLoading",
  component: MeetupContactDetailLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MeetupContactDetailLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
