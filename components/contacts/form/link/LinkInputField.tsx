"use client";

import type {
  ContactFormFieldName,
  CreateContactsSchema,
} from "@/validations/private/contactsValidation";
import type { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ContactLinkFieldName = Extract<
  ContactFormFieldName,
  | "githubHandle"
  | "githubId"
  | "twitterHandle"
  | "twitterId"
  | "websiteHandle"
  | "websiteUrl"
  | "productHandle"
  | "productUrl"
  | "otherHandle"
  | "other"
>;

type Props = {
  formControl: Control<CreateContactsSchema>;
  name: ContactLinkFieldName;
  label: string;
  placeholder: string;
};
export const LinkInputField = ({
  formControl,
  name,
  label,
  placeholder,
}: Props) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
