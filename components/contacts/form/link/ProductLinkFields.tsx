import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputFields } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const ProductLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputFields
        formControl={formControl}
        name="productHandle"
        label="個人開発サービス名"
        placeholder="例: ReMeet"
      />
      <LinkInputFields
        formControl={formControl}
        name="productUrl"
        label="個人開発サービス URL"
        placeholder="https://product.example"
      />
    </>
  );
};
