import type { Meta, StoryObj } from "@storybook/react";

import { DashboardStats } from "@/components/dashboard/dashboard-stats";

const meta = {
  title: "Dashboard/DashboardStats",
  component: DashboardStats,
  args: {
    meetupCount: 18,
    thisYearContactCount: 64,
    latestMeetup: {
      name: "Tokyo Builders Meetup #12",
      scheduledAt: new Date("2024-08-10T11:00:00+09:00"),
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DashboardStats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const NoLatestMeetup: Story = {
  args: {
    latestMeetup: null,
  },
};

export const HighActivity: Story = {
  args: {
    meetupCount: 128,
    thisYearContactCount: 842,
  },
};
