import type { Meta, StoryObj } from "@storybook/react";

import { DeleteTagForm } from "@/components/tag/form/DeleteTagForm";

const meta = {
  title: "Tags/DeleteTagForm",
  component: DeleteTagForm,
  parameters: {
    layout: "centered",
  },
  args: {
    tagId: "tag-saas",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xs px-4 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DeleteTagForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
