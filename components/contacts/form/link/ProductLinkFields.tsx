import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputField } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const ProductLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputField
        formControl={formControl}
        name="productHandle"
        label="個人開発サービス名"
        placeholder="例: ReMeet"
      />
      <LinkInputField
        formControl={formControl}
        name="productUrl"
        label="個人開発サービス URL"
        placeholder="https://product.example"
      />
    </>
  );
};
