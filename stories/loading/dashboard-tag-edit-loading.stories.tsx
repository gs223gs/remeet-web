import type { Meta, StoryObj } from "@storybook/react";

import TagEditLoading from "@/app/(private)/dashboard/tags/[tagId]/edit/loading";

const meta = {
  title: "Pages/Dashboard/TagEditLoading",
  component: TagEditLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TagEditLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
