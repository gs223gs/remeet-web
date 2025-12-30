import type { Meta, StoryObj } from "@storybook/react";

import { UpdateTagForm } from "@/components/tag/form/UpdateTagForm";

import { sampleTag } from "./tag-contacts-mocks";

const meta = {
  title: "Tags/UpdateTagForm",
  component: UpdateTagForm,
  parameters: {
    layout: "centered",
  },
  args: {
    tag: sampleTag,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl rounded-xl border border-dashed border-muted-foreground/30 bg-background p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UpdateTagForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongName: Story = {
  args: {
    tag: {
      id: "tag-product-hunters",
      name: "Tokyo Product Hunters",
    },
  },
};
