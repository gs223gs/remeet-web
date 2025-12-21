import type { Meta, StoryObj } from "@storybook/react-vite";

import { OtherLinkFields } from "@/components/contacts/form/link/OtherLinkFields";
import { ContactLinkFormPreview } from "@/stories/contacts/link-form-preview";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

type StoryProps = {
  defaultValues?: Partial<CreateContactsSchema>;
  triggerValidation?: boolean;
};

const OtherLinkFieldsStory = ({
  defaultValues,
  triggerValidation,
}: StoryProps) => {
  return (
    <ContactLinkFormPreview
      defaultValues={defaultValues}
      triggerValidation={triggerValidation}
    >
      {(form) => <OtherLinkFields formControl={form.control} />}
    </ContactLinkFormPreview>
  );
};

const meta = {
  title: "Contacts/Links/OtherLinkFields",
  component: OtherLinkFieldsStory,
  args: {
    defaultValues: {
      otherHandle: "",
      other: "",
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
} satisfies Meta<typeof OtherLinkFieldsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
  name: "入力済みの例",
  args: {
    defaultValues: {
      otherHandle: "LinkedIn",
      other: "https://www.linkedin.com/in/taro",
    },
  },
};

export const MissingOtherUrlError: Story = {
  name: "URL 未入力エラー",
  args: {
    defaultValues: {
      otherHandle: "SpeakerDeck",
      other: "",
    },
    triggerValidation: true,
  },
};
