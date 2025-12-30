import type { Meta, StoryObj } from "@storybook/react";

import NotFoundPage from "@/app/(private)/not-found";

const meta = {
  title: "NotFound/privateGlobal",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
