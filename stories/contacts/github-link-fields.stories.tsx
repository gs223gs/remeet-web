import type { Meta, StoryObj } from "@storybook/react-vite";

import { GithubLinkFields } from "@/components/contacts/form/link/GithubLinkFields";
import { ContactLinkFormPreview } from "@/stories/contacts/link-form-preview";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

type StoryProps = {
  defaultValues?: Partial<CreateContactsSchema>;
  triggerValidation?: boolean;
};

const GithubLinkFieldsStory = ({
  defaultValues,
  triggerValidation,
}: StoryProps) => {
  return (
    <ContactLinkFormPreview
      defaultValues={defaultValues}
      triggerValidation={triggerValidation}
    >
      {(form) => <GithubLinkFields formControl={form.control} />}
    </ContactLinkFormPreview>
  );
};

const meta = {
  title: "Contacts/Links/GithubLinkFields",
  component: GithubLinkFieldsStory,
  args: {
    defaultValues: {
      githubHandle: "",
      githubId: "",
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
} satisfies Meta<typeof GithubLinkFieldsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
  name: "入力済みの例",
  args: {
    defaultValues: {
      githubHandle: "山田 太郎",
      githubId: "https://github.com/taro",
    },
  },
};

export const MissingGithubIdError: Story = {
  name: "GitHub ID が未入力の場合",
  args: {
    defaultValues: {
      githubHandle: "山田 太郎",
      githubId: "",
    },
    triggerValidation: true,
  },
};
