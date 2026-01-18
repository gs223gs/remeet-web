import type { Result } from "@/type/error/error";
import type { ContactsFormData } from "@/type/private/contacts/contacts";
import type { LinkType } from "@prisma/client";

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
          code: "authorization",
          message: ["権限がありません"], //TODO meetupの権限がありません と出してもいいか? => エンドユーザーに必要な情報か？, 脆弱にるだけか？
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
            message: ["タグが不正です"], //TODO meetup と同様の理由
          },
        };
      }
    }

    //今後linkが増えたらfunctionにする
    const linkFields = [
      {
        type: "GITHUB" as LinkType,
        url: validatedFields.githubId,
        handle: validatedFields.githubHandle,
      },
      {
        type: "TWITTER" as LinkType,
        url: validatedFields.twitterId,
        handle: validatedFields.twitterHandle,
      },
      {
        type: "WEBSITE" as LinkType,
        url: validatedFields.websiteUrl,
        handle: validatedFields.websiteHandle,
      },
      {
        type: "OTHER" as LinkType,
        url: validatedFields.other,
        handle: validatedFields.otherHandle,
      },
      {
        type: "PRODUCT" as LinkType,
        url: validatedFields.productUrl,
        handle: validatedFields.productHandle,
      },
    ] as const;

    const insertableLinks = linkFields.flatMap((l) =>
      l.url
        ? [
            {
              type: l.type,
              url: l.url,
              ...(l.handle ? { handle: l.handle } : {}),
            },
          ]
        : [],
    );

    const addContactsData = {
      meetupId: meetupId,
      userId: userId,
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
        message: ["contactの作成に失敗しました"],
      },
    };
  }
};
