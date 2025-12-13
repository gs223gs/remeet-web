import type { Meta, StoryObj } from "@storybook/react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";

const meta = {
  title: "Dashboard/DashboardHeader",
  component: DashboardHeader,
  args: {
    eyebrow: "meetup overview",
    title: "ダッシュボード",
    description: "直近のMeetupとコンタクト状況をここで素早く確認しましょう。",
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl rounded-xl border border-dashed border-muted-foreground/40 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DashboardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ProductLaunch: Story = {
  args: {
    eyebrow: "product focus",
    title: "リリース準備ボード",
    description:
      "高優先度のMeetupでのアナウンス事項を整理し、メッセージの一貫性を担保しましょう。",
  },
};
