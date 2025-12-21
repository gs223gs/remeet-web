import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollTagSelector } from "@/components/tag/display/ScrollTagSelector";

const mockTags = [
  { id: "tag-1", name: "プロダクト" },
  { id: "tag-2", name: "営業" },
  { id: "tag-3", name: "マーケティング" },
  { id: "tag-4", name: "デザイン" },
  { id: "tag-5", name: "エンジニアリング" },
];

const meta = {
  title: "Tags/ScrollTagSelector",
  component: ScrollTagSelector,
  parameters: {
    layout: "centered",
  },
  args: {
    userTags: mockTags,
    tagQuery: "",
    onTagSelect: () => {},
  },
  argTypes: {
    onTagSelect: {
      action: "タグを選択",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md rounded-xl border border-dashed border-muted-foreground/30 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollTagSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "一覧表示",
};

export const WithQueryHit: Story = {
  name: "検索ヒットあり",
  args: {
    tagQuery: "デ",
  },
};

export const WithNoMatch: Story = {
  name: "検索ヒットなし",
  args: {
    tagQuery: "ブロックチェーン",
  },
};
