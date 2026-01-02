import type { Meta, StoryObj } from "@storybook/react";
import type { Session } from "next-auth";

import { SidebarUserProfile } from "@/components/SidebarUserProfile";
import {
  MockSessionProvider,
  createMockSession,
  defaultSession,
  type SessionStatus,
} from "@/stories/utils/mock-session";

function ProfileStoryWrapper({
  session = defaultSession,
  status = "authenticated",
}: {
  session?: Session | null;
  status?: SessionStatus;
}) {
  return (
    <MockSessionProvider session={session} status={status}>
      <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-3 text-sm shadow-sm">
        <SidebarUserProfile />
      </div>
    </MockSessionProvider>
  );
}

const meta = {
  title: "Layout/SidebarUserProfile",
  component: SidebarUserProfile,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SidebarUserProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Authenticated",
  render: () => <ProfileStoryWrapper session={defaultSession} />,
};

export const WithoutAvatar: Story = {
  name: "Authenticated (No Avatar)",
  render: () => (
    <ProfileStoryWrapper session={createMockSession({ image: undefined })} />
  ),
};

export const Guest: Story = {
  name: "Guest Fallback",
  render: () => <ProfileStoryWrapper session={null} status="unauthenticated" />,
};

export const Loading: Story = {
  name: "Loading Skeleton",
  render: () => (
    <ProfileStoryWrapper session={defaultSession} status="loading" />
  ),
};
