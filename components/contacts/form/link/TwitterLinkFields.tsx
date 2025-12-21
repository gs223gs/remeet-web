import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputField } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const TwitterLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputField
        formControl={formControl}
        name="twitterHandle"
        label="twitter 表示名"
        placeholder="Jon due"
      />
      <LinkInputField
        formControl={formControl}
        name="twitterId"
        label="twitter ID"
        placeholder="username"
      />
    </>
  );
};
