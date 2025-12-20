import { useEffect, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  createContactsFrontSchema,
  type CreateContactsSchema,
} from "@/validations/private/contactsValidation";

const baseDefaultValues: CreateContactsSchema = {
  name: "山田 太郎",
  company: "",
  role: "",
  description: "",
  tags: [],
  githubHandle: "",
  githubId: "",
  twitterHandle: "",
  twitterId: "",
  websiteHandle: "",
  websiteUrl: "",
  productHandle: "",
  productUrl: "",
  otherHandle: "",
  other: "",
};

export const createContactDefaultValues = (
  overrides: Partial<CreateContactsSchema> = {},
) => ({
  ...baseDefaultValues,
  ...overrides,
});

type RenderFormFn = (form: UseFormReturn<CreateContactsSchema>) => ReactNode;

type ContactLinkFormPreviewProps = {
  children: RenderFormFn;
  defaultValues?: Partial<CreateContactsSchema>;
  className?: string;
  triggerValidation?: boolean;
};

export const ContactLinkFormPreview = ({
  children,
  defaultValues,
  className,
  triggerValidation = false,
}: ContactLinkFormPreviewProps) => {
  const form = useForm<CreateContactsSchema>({
    resolver: zodResolver(createContactsFrontSchema),
    defaultValues: createContactDefaultValues(defaultValues),
    mode: "onChange",
  });

  useEffect(() => {
    if (triggerValidation) {
      void form.trigger();
    }
  }, [form, triggerValidation]);

  return (
    <Form {...form}>
      <form
        className={cn(
          "space-y-4 rounded-xl border border-dashed border-muted-foreground/30 bg-background p-4",
          className,
        )}
      >
        {children(form)}
      </form>
    </Form>
  );
};

export type ContactFormControl = Control<CreateContactsSchema>;
