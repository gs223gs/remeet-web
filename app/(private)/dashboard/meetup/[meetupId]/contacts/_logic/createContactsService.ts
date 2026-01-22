import { convertInsertableLinks } from "./convertInsertableLinks";

import type { Result } from "@/type/error/error";
import type { ContactsFormData } from "@/type/private/contacts/contacts";

import { linkRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { tagRepository } from "@/app/(private)/dashboard/tags/_server/tagRepository";
import { prisma } from "@/lib/prisma";

export const createContactService = async (
  meetupId: string,
  userId: string,
  validatedFields: ContactsFormData,
): Promise<Result<void>> => {
  try {
    const verifyOwnedMeetup = await meetupRepository.verifyUserOwnedMeetup(
      userId,
      meetupId,
    );

    //TODO ここあとで整える
    if (!verifyOwnedMeetup.ok)
      return {
        ok: false,
        error: {
          code: verifyOwnedMeetup.error.code,
        },
      };
    //TODO リファクタリング対象
    //ちょっと不愉快
    const validatedTagId = validatedFields.tags;
    if (validatedTagId?.length) {
      const verifiedTag = await tagRepository.validateOwnedTagsExistence(
        userId,
        validatedTagId,
      );
      if (!verifiedTag.ok) {
        return {
          ok: false,
          error: {
            code: "authorization",
          },
        };
      }
    }

    const insertableLinks = convertInsertableLinks(validatedFields);

    const addContactsData = {
      meetupId,
      userId,
      name: validatedFields.name,
      company: validatedFields.company,
      role: validatedFields.role,
      description: validatedFields.description,
    };

    await prisma.$transaction(async (tx) => {
      const createdContact = await contactRepository.create(
        tx,
        addContactsData,
      );
      if (!createdContact.ok) {
        throw new Error("abort transaction");
      }

      if (insertableLinks.length) {
        const createdLinks = await linkRepository.create(
          tx,
          createdContact.data,
          insertableLinks,
        );

        if (!createdLinks.ok) {
          throw new Error("abort transaction");
        }
      }
      if (validatedTagId?.length) {
        const createdContactTags = await tagRepository.createContactTag(
          tx,
          createdContact.data,
          validatedTagId,
        );
        if (!createdContactTags.ok) {
          throw new Error("abort transaction");
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
