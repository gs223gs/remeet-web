import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputFields } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const GithubLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputFields
        formControl={formControl}
        name="githubHandle"
        label="GitHub 表示名"
        placeholder="John Doe"
      />
      <LinkInputFields
        formControl={formControl}
        name="githubId"
        label="GitHub ID"
        placeholder="username"
      />
    </>
  );
};
