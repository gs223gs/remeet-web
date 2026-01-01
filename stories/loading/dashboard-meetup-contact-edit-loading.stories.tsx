import type { Meta, StoryObj } from "@storybook/react";

import MeetupContactEditLoading from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/[contactsId]/edit/loading";

const meta = {
  title: "Pages/Dashboard/MeetupContactEditLoading",
  component: MeetupContactEditLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MeetupContactEditLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
