import type { Meta, StoryObj } from "@storybook/react";

import {
  LatestMeetupCard,
  type LatestMeetupData,
} from "@/components/dashboard/latest-meetup-card";

const sampleMeetup: LatestMeetupData = {
  meetupId: "meetup-2024-08",
  name: "Tokyo Builders Meetup #12",
  scheduledAt: new Date("2024-08-10T11:00:00+09:00"),
  contacts: [
    { id: "contact-1", name: "山田 太郎" },
    { id: "contact-2", name: "佐藤 花子" },
    { id: "contact-3", name: "Alex Johnson" },
  ],
};

const meta = {
  title: "Dashboard/LatestMeetupCard",
  component: LatestMeetupCard,
  args: {
    latestMeetup: sampleMeetup,
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LatestMeetupCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleContacts: Story = {
  args: {
    latestMeetup: {
      ...sampleMeetup,
      contacts: [
        { id: "contact-1", name: "山田 太郎" },
        { id: "contact-2", name: "佐藤 花子" },
        { id: "contact-3", name: "Alex Johnson" },
        { id: "contact-4", name: "Binh Nguyen" },
        { id: "contact-5", name: "田中 美咲" },
      ],
    },
  },
};

export const EmptyState: Story = {
  args: {
    latestMeetup: null,
  },
};
