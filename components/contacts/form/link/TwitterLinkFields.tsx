import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputFields } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const TwitterLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputFields
        formControl={formControl}
        name="twitterHandle"
        label="Twitter 表示名"
        placeholder="Jon due"
      />
      <LinkInputFields
        formControl={formControl}
        name="twitterId"
        label="twitter ID"
        placeholder="@username"
      />
    </>
  );
};
