import { contactsActionSchema } from "@/validations/private/contactsValidation";

const getLinkValueOrUndefined = (key: string, formData: FormData) =>
  formData.get(key) ?? undefined;

export const contactValidation = (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
    company: formData.get("company"),
    role: formData.get("role"),
    description: formData.get("description"),
    tags: formData.getAll("tags"),
    githubHandle: getLinkValueOrUndefined("githubHandle", formData),
    githubId: getLinkValueOrUndefined("githubId", formData),
    twitterHandle: getLinkValueOrUndefined("twitterHandle", formData),
    twitterId: getLinkValueOrUndefined("twitterId", formData),
    websiteHandle: getLinkValueOrUndefined("websiteHandle", formData),
    websiteUrl: getLinkValueOrUndefined("websiteUrl", formData),
    productHandle: getLinkValueOrUndefined("productHandle", formData),
    productUrl: getLinkValueOrUndefined("productUrl", formData),
    otherHandle: getLinkValueOrUndefined("otherHandle", formData),
    other: getLinkValueOrUndefined("other", formData),
  };

  return contactsActionSchema.safeParse(rawFormData);
};
