import { convertInsertableLinks } from "./convertInsertableLinks";

import type { Result } from "@/type/error/error";
import type { ContactsFormData } from "@/type/private/contacts/contacts";

import { linkRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { tagRepository } from "@/app/(private)/dashboard/tags/_server/tagRepository";
import { prisma } from "@/lib/prisma";

export const updateContactsService = async (
  meetupId: string,
  contactId: string,
  userId: string,
  validatedFields: ContactsFormData,
): Promise<Result<void>> => {
  try {
    const verifyOwnedMeetup = await meetupRepository.verifyUserOwnedMeetup(
      userId,
      meetupId,
    );

    if (!verifyOwnedMeetup.ok)
      return {
        ok: false,
        error: {
          code: verifyOwnedMeetup.error.code,
        },
      };

    const validatedTagId = validatedFields.tags;
    if (validatedTagId?.length) {
      const verifiedTag = await tagRepository.validateOwnedTagsExistence(
        userId,
        validatedTagId,
      );
      if (!verifiedTag.ok)
        return {
          ok: false,
          error: {
            code: verifiedTag.error.code,
          },
        };
    }

    const insertableLinks = convertInsertableLinks(validatedFields);

    const updateContactsData = {
      meetupId,
      userId,
      name: validatedFields.name,
      company: validatedFields.company,
      role: validatedFields.role,
      description: validatedFields.description,
    };

    await prisma.$transaction(async (tx) => {
      const createdContact = await contactRepository.update(
        tx,
        contactId,
        updateContactsData,
      );
      if (!createdContact.ok) {
        throw new Error("contactのupdateに失敗");
      }

      const deletedContactLinks = await linkRepository.deleteByContactId(
        tx,
        contactId,
      );
      if (!deletedContactLinks.ok) {
        throw new Error("contactLinkの削除に失敗");
      }

      if (insertableLinks.length) {
        const createdLinks = await linkRepository.create(
          tx,
          createdContact.data,
          insertableLinks,
        );

        if (!createdLinks.ok) throw new Error("linkの作成に失敗");
      }

      const deletedContactTags =
        await tagRepository.deleteContactTagByContactId(tx, contactId);
      if (!deletedContactTags.ok) {
        throw new Error("contactTagの削除に失敗");
      }

      if (validatedTagId?.length) {
        const createdContactTags = await tagRepository.createContactTag(
          tx,
          createdContact.data,
          validatedTagId,
        );
        if (!createdContactTags.ok) {
          throw new Error("contactTagの作成に失敗");
        }
      }
    });

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "db_error",
      },
    };
  }
};
