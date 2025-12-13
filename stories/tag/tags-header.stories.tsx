import type { Meta, StoryObj } from "@storybook/react";

import { TagsHeader } from "@/components/tag/display/tags-header";

const meta = {
  title: "Tags/TagsHeader",
  component: TagsHeader,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl rounded-xl border border-dashed border-muted-foreground/40 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagsHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
