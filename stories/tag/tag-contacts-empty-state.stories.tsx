import type { Meta, StoryObj } from "@storybook/react";

import { TagContactsEmptyState } from "@/components/tag/display/TagContactsEmptyState";

const meta = {
  title: "Tags/TagContactsEmptyState",
  component: TagContactsEmptyState,
  parameters: {
    layout: "centered",
  },
  args: {
    tagName: "SaaS",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl px-6 py-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagContactsEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTagName: Story = {
  args: {
    tagName: "Enterprise Data Platform",
  },
};
