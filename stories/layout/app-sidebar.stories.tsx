import type { Meta, StoryObj } from "@storybook/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

type SidebarStoryContainerProps = {
  defaultOpen?: boolean;
  openMobile?: boolean;
};

const storySession: Session = {
  user: {
    name: "山田 太郎",
    email: "taro@example.com",
    image: "https://i.pravatar.cc/120?img=56",
  },
  expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

function SidebarStoryContainer({
  defaultOpen = false,
  openMobile = false,
}: SidebarStoryContainerProps) {
  return (
    <div className="min-h-[480px] w-full bg-muted/20 p-6">
      <SessionProvider session={storySession}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SidebarStoryContent openMobile={openMobile} />
        </SidebarProvider>
      </SessionProvider>
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
