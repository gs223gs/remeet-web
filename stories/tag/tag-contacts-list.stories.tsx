import type { Meta, StoryObj } from "@storybook/react";

import { TagContactsList } from "@/components/tag/display/TagContactsList";

import { mockTagContacts, sampleTag } from "./tag-contacts-mocks";

const meta = {
  title: "Tags/TagContactsList",
  component: TagContactsList,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    contacts: mockTagContacts,
    tagName: sampleTag.name,
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagContactsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    contacts: [],
  },
};
