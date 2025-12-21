import { contactsActionSchema } from "@/validations/private/contactsValidation";

export const contactValidation = (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
    company: formData.get("company"),
    role: formData.get("role"),
    description: formData.get("description"),
    tags: formData.getAll("tags"),
    githubHandle: formData.get("githubHandle"),
    githubId: formData.get("githubId"),
    twitterHandle: formData.get("twitterHandle"),
    twitterId: formData.get("twitterId"),
    websiteHandle: formData.get("websiteHandle"),
    websiteUrl: formData.get("websiteUrl"),
    productHandle: formData.get("productHandle"),
    productUrl: formData.get("productUrl"),
    otherHandle: formData.get("otherHandle"),
    other: formData.get("other"),
  };

  return contactsActionSchema.safeParse(rawFormData);
};
