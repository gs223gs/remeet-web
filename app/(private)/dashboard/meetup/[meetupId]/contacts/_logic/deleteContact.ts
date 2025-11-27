import { prisma } from "@/lib/prisma";

export const deleteContactRepository = async (
  contactId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await prisma.contact.delete({
      where: { id: contactId, userId: userId },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
