import type { Meta, StoryObj } from "@storybook/react";

import { TagsList } from "@/components/tag/display/tags-list";

const mockTags = [
  { id: "tag-1", name: "React", count: 42 },
  { id: "tag-2", name: "Design", count: 27 },
  { id: "tag-3", name: "Open Source", count: 18 },
  { id: "tag-4", name: "プロダクト", count: 12 },
  { id: "tag-5", name: "Sales", count: 8 },
  { id: "tag-6", name: "Japan SaaS", count: 5 },
];

const meta = {
  title: "Tags/TagsList",
  component: TagsList,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    tags: mockTags,
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: {
    tags: [],
  },
};
