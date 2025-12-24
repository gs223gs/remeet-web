import type { Result } from "@/type/error/error";
import type { LinkType } from "@prisma/client";

import { contactValidation } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/contactsValidation";
import { linkRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { tagRepository } from "@/app/(private)/dashboard/tags/_server/tagRepository";
import { prisma } from "@/lib/prisma";

export const createContactService = async (
  meetupId: string,
  userId: string,
  formData: FormData,
): Promise<Result<void>> => {
  try {
    const validatedFields = contactValidation(formData);

    if (!validatedFields.success)
      return {
        ok: false,
        error: {
          code: "validation",
          message: ["validationエラーです"], //一旦これ本当はzodのやつにしたい
        },
      };

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
    const validatedTagId = validatedFields.data.tags;
    if (validatedTagId) {
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

    //TODO ここ本当に変えたい 冗長すぎる
    //? type ContactsLink の url:string を undefined 許容にすれば解決だけど，そのために型を増やしたくない && DBと合わないから嫌だ
    const insertLinks = [
      {
        type: "GITHUB" as LinkType,
        url: validatedFields.data.githubId,
        handle: validatedFields.data.githubHandle,
      },
      {
        type: "TWITTER" as LinkType,
        url: validatedFields.data.twitterId,
        handle: validatedFields.data.twitterHandle,
      },
      {
        type: "WEBSITE" as LinkType,
        url: validatedFields.data.websiteUrl,
        handle: validatedFields.data.websiteHandle,
      },
      {
        type: "OTHER" as LinkType,
        url: validatedFields.data.other,
        handle: validatedFields.data.otherHandle,
      },
      {
        type: "PRODUCT" as LinkType,
        url: validatedFields.data.productUrl,
        handle: validatedFields.data.productHandle,
      },
    ] as const;

    const addContactsData = {
      meetupId: meetupId,
      userId: userId,
      name: validatedFields.data.name,
      company: validatedFields.data.company,
      role: validatedFields.data.role,
      description: validatedFields.data.description,
    };

    const filterInsertLinks = insertLinks.flatMap((l) =>
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
    await prisma.$transaction(async (tx) => {
      const createdContact = await contactRepository.create(
        tx,
        addContactsData,
      );
      if (!createdContact.ok) {
        throw new Error("abort transaction");
      }

      if (filterInsertLinks.length) {
        const createdLinks = await linkRepository.create(
          tx,
          createdContact.data,
          filterInsertLinks,
        );

        if (!createdLinks.ok) {
          throw new Error("abort transaction");
        }
      }
      if (validatedTagId) {
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
