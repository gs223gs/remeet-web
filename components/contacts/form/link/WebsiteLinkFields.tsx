import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputFields } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const WebsiteLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputFields
        formControl={formControl}
        name="websiteHandle"
        label="Webサイト名"
        placeholder="例: ポートフォリオサイト"
      />
      <LinkInputFields
        formControl={formControl}
        name="websiteUrl"
        label="Webサイト URL"
        placeholder="https://example.com"
      />
    </>
  );
};
