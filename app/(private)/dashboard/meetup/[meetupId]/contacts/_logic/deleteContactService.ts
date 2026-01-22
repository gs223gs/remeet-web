import type { Result } from "@/type/error/error";

import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { getOwnedContact } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/service/checkContactOwner";

export const deleteContactService = async (
  contactId: string,
  userId: string,
): Promise<Result<void>> => {
  //TODO refactor 対象
  const contactOwnershipResult = await getOwnedContact(contactId, userId);
  if (!contactOwnershipResult.ok)
    return {
      ok: false,
      error: {
        code: "authorization",
      },
    };
  const contactDeleteResult = await contactRepository.delete(
    contactOwnershipResult.data.contactId,
    contactOwnershipResult.data.userId,
  );
  if (!contactDeleteResult.ok) {
    return {
      ok: false,
      error: {
        code: contactDeleteResult.error.code,
      },
    };
  }
  return {
    ok: true,
    data: undefined,
  };
};
