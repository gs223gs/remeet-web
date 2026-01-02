import type { Meta, StoryObj } from "@storybook/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { SidebarUserProfile } from "@/components/SidebarUserProfile";

type SessionUser = NonNullable<Session["user"]>;

const defaultUser: SessionUser = {
  name: "山田 太郎",
  email: "taro@example.com",
  image: "https://i.pravatar.cc/96?img=12",
};

const createSession = (overrides?: Partial<SessionUser>): Session => ({
  user: { ...defaultUser, ...overrides },
  expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
});

const defaultSession = createSession();

function ProfileStoryWrapper({ session }: { session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-3 text-sm shadow-sm">
        <SidebarUserProfile />
      </div>
    </SessionProvider>
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
    <ProfileStoryWrapper session={createSession({ image: undefined })} />
  ),
};

export const Guest: Story = {
  name: "Guest Fallback",
  render: () => <ProfileStoryWrapper session={null} />,
};
