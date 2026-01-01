import type { Meta, StoryObj } from "@storybook/react";

import TagDetailLoading from "@/app/(private)/dashboard/tags/[tagId]/loading";

const meta = {
  title: "Pages/Dashboard/TagDetailLoading",
  component: TagDetailLoading,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TagDetailLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
