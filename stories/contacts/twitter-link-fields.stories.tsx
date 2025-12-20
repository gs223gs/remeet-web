import type { Meta, StoryObj } from "@storybook/react-vite";

import { TwitterLinkFields } from "@/components/contacts/form/link/TwitterLinkFields";
import { ContactLinkFormPreview } from "@/stories/contacts/link-form-preview";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

type StoryProps = {
  defaultValues?: Partial<CreateContactsSchema>;
  triggerValidation?: boolean;
};

const TwitterLinkFieldsStory = ({
  defaultValues,
  triggerValidation,
}: StoryProps) => {
  return (
    <ContactLinkFormPreview
      defaultValues={defaultValues}
      triggerValidation={triggerValidation}
    >
      {(form) => <TwitterLinkFields formControl={form.control} />}
    </ContactLinkFormPreview>
  );
};

const meta = {
  title: "Contacts/Links/TwitterLinkFields",
  component: TwitterLinkFieldsStory,
  args: {
    defaultValues: {
      twitterHandle: "",
      twitterId: "",
    },
    triggerValidation: false,
  },
  argTypes: {
    defaultValues: {
      control: "object",
    },
    triggerValidation: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof TwitterLinkFieldsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
  name: "入力済みの例",
  args: {
    defaultValues: {
      twitterHandle: "ReMeet",
      twitterId: "@remeet_dev",
    },
  },
};

export const MissingTwitterIdError: Story = {
  name: "Twitter ID 未入力エラー",
  args: {
    defaultValues: {
      twitterHandle: "交流メモ",
      twitterId: "",
    },
    triggerValidation: true,
  },
};
