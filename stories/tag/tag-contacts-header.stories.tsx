import type { Meta, StoryObj } from "@storybook/react";

import { TagContactsHeader } from "@/components/tag/display/TagContactsHeader";

const meta = {
  title: "Tags/TagContactsHeader",
  component: TagContactsHeader,
  parameters: {
    layout: "centered",
  },
  args: {
    tagId: "tag-saas",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl px-4 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagContactsHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StackLayout: Story = {
  name: "Stacked layout (narrow)",
  render: (args) => (
    <div className="w-full max-w-xs">
      <TagContactsHeader {...args} />
    </div>
  ),
};
