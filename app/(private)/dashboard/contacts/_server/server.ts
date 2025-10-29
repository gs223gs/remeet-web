"use server";

import { getUser } from "@/auth";
import { Result } from "@/type/error/error";
import { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import { prisma } from "@/lib/prisma";
import { MeetupDetail } from "@/type/private/meetup/meetup";

export const getContacts = async (): Promise<
  Result<(ContactsDetailDTO & { meetup: MeetupDetail })[]>
> => {
  const user = await getUser();

  if (!user)
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    };
  try {
    const contacts = await prisma.contact.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        company: true,
        role: true,
        links: {
          select: {
            id: true,
            type: true,
            url: true,
            handle: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        meetups: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            meetup: {
              select: {
                id: true,
                name: true,
                scheduledAt: true,
              },
            },
          },
        },
      },
    });

    return {
      ok: true,
      data: contacts.map((c) => {
        //現在のやりたい実装は contactは一つのmeetupしか参加しない(contactを使い回さない)設計のためこの方法となる
        //schema自体を多対多にしたため，prismaで取得するとmeetups(配列になって帰ってきてしまう)ので現在の実装になります
        const [first] = c.meetups;
        return {
          id: c.id,
          name: c.name,
          company: c.company ?? undefined,
          role: c.role ?? undefined,
          links:
            c.links.map((l) => {
              return {
                id: l.id,
                type: l.type,
                handle: l.handle ?? undefined,
                url: l.url,
              };
            }) ?? undefined,
          tags:
            c.tags.map((t) => {
              return {
                id: t.tag.id,
                name: t.tag.name,
              };
            }) ?? undefined,
          meetup: {
            id: first.meetup.id,
            name: first.meetup.name,
            scheduledAt: first.meetup.scheduledAt,
          },
        };
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "not_found",
        message: ["謎のエラー"], //TODO 後でなおす
      },
    };
  }
};
