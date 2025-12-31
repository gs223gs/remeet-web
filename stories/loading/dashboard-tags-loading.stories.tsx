import type { Meta, StoryObj } from "@storybook/react";

import TagsLoading from "@/app/(private)/dashboard/tags/loading";

const meta = {
  title: "Pages/Dashboard/TagsLoading",
  component: TagsLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TagsLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
