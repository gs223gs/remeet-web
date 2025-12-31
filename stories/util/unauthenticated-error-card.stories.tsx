import type { Meta, StoryObj } from "@storybook/react";

import { UnauthenticatedErrorCard } from "@/components/util/UnauthenticatedErrorCard";

const meta = {
  title: "Util/UnauthenticatedErrorCard",
  component: UnauthenticatedErrorCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UnauthenticatedErrorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
