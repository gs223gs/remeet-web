import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductLinkFields } from "@/components/contacts/form/link/ProductLinkFields";
import { ContactLinkFormPreview } from "@/stories/contacts/link-form-preview";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

type StoryProps = {
  defaultValues?: Partial<CreateContactsSchema>;
};

const ProductLinkFieldsStory = ({ defaultValues }: StoryProps) => {
  return (
    <ContactLinkFormPreview defaultValues={defaultValues}>
      {(form) => <ProductLinkFields formControl={form.control} />}
    </ContactLinkFormPreview>
  );
};

const meta = {
  title: "Contacts/Links/ProductLinkFields",
  component: ProductLinkFieldsStory,
  args: {
    defaultValues: {
      productHandle: "",
      productUrl: "",
    },
  },
  argTypes: {
    defaultValues: {
      control: "object",
    },
  },
} satisfies Meta<typeof ProductLinkFieldsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
  name: "入力済みの例",
  args: {
    defaultValues: {
      productHandle: "ReMeet",
      productUrl: "https://remeet.dev",
    },
  },
};
