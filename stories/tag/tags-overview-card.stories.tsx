import type { Meta, StoryObj } from "@storybook/react";

import { TagsOverviewCard } from "@/components/tag/display/tags-overview-card";

const topTag = {
  id: "tag-1",
  name: "React",
  count: 42,
};

const meta = {
  title: "Tags/TagsOverviewCard",
  component: TagsOverviewCard,
  parameters: {
    layout: "centered",
  },
  args: {
    topTag,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagsOverviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HighlightedTag: Story = {};

export const EmptyState: Story = {
  args: {
    topTag: null,
  },
};
