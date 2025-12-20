import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import { LinkInputFields } from "@/components/contacts/form/link/LinkInputField";

type Props = {
  formControl: Control<CreateContactsSchema>;
};

export const OtherLinkFields = ({ formControl }: Props) => {
  return (
    <>
      <LinkInputFields
        formControl={formControl}
        name="otherHandle"
        label="その他リンクの名称"
        placeholder="例: LinkedIn / SpeakerDeck"
      />
      <LinkInputFields
        formControl={formControl}
        name="other"
        label="その他リンク URL"
        placeholder="https://..."
      />
    </>
  );
};
