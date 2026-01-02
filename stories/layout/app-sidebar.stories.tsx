import type { Meta, StoryObj } from "@storybook/react";
import type { Session } from "next-auth";
import { useEffect, type ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import {
  MockSessionProvider,
  defaultSession,
  type SessionStatus,
} from "@/stories/utils/mock-session";

type SidebarStoryContainerProps = {
  defaultOpen?: boolean;
  openMobile?: boolean;
  session?: Session | null;
  sessionStatus?: SessionStatus;
  mockSignOutError?: boolean;
};

function SidebarStoryContainer({
  defaultOpen = false,
  openMobile = false,
  session = defaultSession,
  sessionStatus = "authenticated",
  mockSignOutError = false,
}: SidebarStoryContainerProps) {
  return (
    <div className="min-h-[480px] w-full bg-muted/20 p-6">
      <MockSessionProvider session={session} status={sessionStatus}>
        <SignOutMockBoundary enabled={mockSignOutError}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <SidebarStoryContent openMobile={openMobile} />
          </SidebarProvider>
        </SignOutMockBoundary>
      </MockSessionProvider>
    </div>
  );
}

function SidebarStoryContent({ openMobile }: { openMobile?: boolean }) {
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    if (openMobile) {
      setOpenMobile(true);
    }
  }, [openMobile, setOpenMobile]);

  return (
    <div className="flex min-h-[360px] overflow-hidden rounded-xl border bg-background text-foreground shadow-sm">
      <AppSidebar />
      <div className="flex flex-1 flex-col gap-4 bg-muted/30 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">プレビューコンテンツ</p>
        <p>
          サイドバーの展開・折りたたみや、プロフィールメニューの挙動を確認できます。
        </p>
      </div>
    </div>
  );
}

const meta = {
  title: "Layout/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  name: "Desktop (Collapsed)",
  render: () => <SidebarStoryContainer defaultOpen={false} />,
};

export const Expanded: Story = {
  name: "Desktop (Expanded)",
  render: () => <SidebarStoryContainer defaultOpen />,
};

export const MobileDrawer: Story = {
  name: "Mobile",
  render: () => <SidebarStoryContainer openMobile />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Guest: Story = {
  name: "Desktop (Guest Fallback)",
  render: () => (
    <SidebarStoryContainer
      defaultOpen
      session={null}
      sessionStatus="unauthenticated"
    />
  ),
};

export const Loading: Story = {
  name: "Desktop (Loading Skeleton)",
  render: () => (
    <SidebarStoryContainer defaultOpen sessionStatus="loading" session={null} />
  ),
};

export const LogoutError: Story = {
  name: "Desktop (Logout Error Toast)",
  render: () => (
    <SidebarStoryContainer
      defaultOpen
      mockSignOutError
      session={defaultSession}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "プロフィールメニューを開き「ログアウト」を押すと、サインアウト失敗時のトーストが表示されます。",
      },
    },
  },
};

function SignOutMockBoundary({
  enabled,
  children,
}: {
  enabled?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined" || typeof window.fetch !== "function") {
      return;
    }

    const originalFetch = window.fetch;
    const boundOriginalFetch = originalFetch.bind(window);
    const failingFetch: typeof window.fetch = async (input, init) => {
      const target =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      if (target.includes("/api/auth/signout")) {
        return Promise.reject(new Error("ログアウトに失敗しました (mock)"));
      }

      return boundOriginalFetch(input as RequestInfo, init as RequestInit);
    };

    window.fetch = failingFetch;

    return () => {
      window.fetch = originalFetch;
    };
  }, [enabled]);

  return <>{children}</>;
}
