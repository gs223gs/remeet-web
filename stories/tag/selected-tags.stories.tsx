import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectedTags } from "@/components/tag/display/SelectedTags";

const selectedMockTags = [
  { id: "selected-1", name: "AI" },
  { id: "selected-2", name: "SaaS" },
  { id: "selected-3", name: "イベント運営" },
];

const meta = {
  title: "Tags/SelectedTags",
  component: SelectedTags,
  parameters: {
    layout: "centered",
  },
  args: {
    selectedTags: selectedMockTags,
    onTagDeselect: () => {},
  },
  argTypes: {
    onTagDeselect: {
      action: "タグを削除",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectedTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  name: "タグあり",
};

export const Empty: Story = {
  name: "タグ未選択",
  args: {
    selectedTags: [],
  },
};
