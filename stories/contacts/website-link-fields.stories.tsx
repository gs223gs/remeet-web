import type { Meta, StoryObj } from "@storybook/react-vite";

import { WebsiteLinkFields } from "@/components/contacts/form/link/WebsiteLinkFields";
import { ContactLinkFormPreview } from "@/stories/contacts/link-form-preview";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

type StoryProps = {
  defaultValues?: Partial<CreateContactsSchema>;
  triggerValidation?: boolean;
};

const WebsiteLinkFieldsStory = ({
  defaultValues,
  triggerValidation,
}: StoryProps) => {
  return (
    <ContactLinkFormPreview
      defaultValues={defaultValues}
      triggerValidation={triggerValidation}
    >
      {(form) => <WebsiteLinkFields formControl={form.control} />}
    </ContactLinkFormPreview>
  );
};

const meta = {
  title: "Contacts/Links/WebsiteLinkFields",
  component: WebsiteLinkFieldsStory,
  args: {
    defaultValues: {
      websiteHandle: "",
      websiteUrl: "",
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
} satisfies Meta<typeof WebsiteLinkFieldsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
  name: "入力済みの例",
  args: {
    defaultValues: {
      websiteHandle: "個人サイト",
      websiteUrl: "https://portfolio.example",
    },
  },
};

export const MissingWebsiteUrlError: Story = {
  name: "URL 未入力エラー",
  args: {
    defaultValues: {
      websiteHandle: "個人サイト",
      websiteUrl: "",
    },
    triggerValidation: true,
  },
};
