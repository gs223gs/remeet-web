import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputField } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const OtherLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputField
        formControl={formControl}
        name="otherHandle"
        label="その他リンクの名称"
        placeholder="例: LinkedIn / SpeakerDeck"
      />
      <LinkInputField
        formControl={formControl}
        name="other"
        label="その他リンク URL"
        placeholder="https://..."
      />
    </>
  );
};
