import type { Meta, StoryObj } from "@storybook/react";

import { RemeetIcon } from "@/components/util/RemeetIcon";

const meta = {
  title: "Util/RemeetIcon",
  component: RemeetIcon,
  parameters: {
    layout: "centered",
  },
  args: {
    size: 160,
  },
  argTypes: {
    size: {
      control: { type: "range", min: 32, max: 240, step: 8 },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center rounded-2xl border bg-muted/40 p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RemeetIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 72,
  },
};
