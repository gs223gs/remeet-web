import type { Meta, StoryObj } from "@storybook/react";

import { ContactCardSkeleton } from "@/components/skeletons/ContactCardSkeleton";

const meta = {
  title: "Skeletons/ContactCardSkeleton",
  component: ContactCardSkeleton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
