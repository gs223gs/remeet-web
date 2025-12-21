import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputField } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const WebsiteLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputField
        formControl={formControl}
        name="websiteHandle"
        label="Webサイト名"
        placeholder="例: ポートフォリオサイト"
      />
      <LinkInputField
        formControl={formControl}
        name="websiteUrl"
        label="Webサイト URL"
        placeholder="https://example.com"
      />
    </>
  );
};
