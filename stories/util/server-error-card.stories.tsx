import type { Meta, StoryObj } from "@storybook/react";

import { ServerErrorCard } from "@/components/util/server-error-card";

const meta = {
  title: "Util/ServerErrorCard",
  component: ServerErrorCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ServerErrorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
