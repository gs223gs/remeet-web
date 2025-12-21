import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { LinkInputField } from "@/components/contacts/form/link/LinkInputField";
import { ContactLinkFormPreview } from "@/stories/contacts/link-form-preview";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

type LinkInputFieldProps = Omit<
  ComponentProps<typeof LinkInputField>,
  "formControl"
>;

type StoryProps = LinkInputFieldProps & {
  defaultValues?: Partial<CreateContactsSchema>;
  triggerValidation?: boolean;
};

const LinkInputFieldStory = ({
  defaultValues,
  triggerValidation,
  ...rest
}: StoryProps) => {
  return (
    <ContactLinkFormPreview
      defaultValues={defaultValues}
      triggerValidation={triggerValidation}
    >
      {(form) => <LinkInputField formControl={form.control} {...rest} />}
    </ContactLinkFormPreview>
  );
};

const meta = {
  title: "Contacts/Links/LinkInputField",
  component: LinkInputFieldStory,
  args: {
    name: "githubHandle",
    label: "GitHub 表示名",
    placeholder: "例: 山田 太郎",
    defaultValues: {
      githubHandle: "山田 太郎",
    },
    triggerValidation: false,
  },
  argTypes: {
    name: {
      control: "select",
      options: [
        "githubHandle",
        "githubId",
        "twitterHandle",
        "twitterId",
        "websiteHandle",
        "websiteUrl",
        "productHandle",
        "productUrl",
        "otherHandle",
        "other",
      ],
    },
    defaultValues: {
      control: "object",
    },
    triggerValidation: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof LinkInputFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GithubIdMissingError: Story = {
  name: "GitHub ID 未入力のエラー",
  args: {
    name: "githubId",
    label: "GitHub ID",
    placeholder: "https://github.com/username",
    defaultValues: {
      githubHandle: "山田 太郎",
      githubId: "",
    },
    triggerValidation: true,
  },
};

export const TwitterHandle: Story = {
  name: "Twitter 表示名入力例",
  args: {
    name: "twitterHandle",
    label: "Twitter 表示名",
    placeholder: "例: taro",
    defaultValues: {
      twitterHandle: "太郎",
    },
  },
};
