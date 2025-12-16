"use server";

import type { Result } from "@/type/error/error";
import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { MeetupDetail } from "@/type/private/meetup/meetup";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

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
      orderBy: {
        createdAt: "desc",
      },
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
        meetup: {
          select: {
            id: true,
            name: true,
            scheduledAt: true,
          },
        },
      },
    });

    return {
      ok: true,
      data: contacts.map((c) => {
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
            id: c.meetup.id,
            name: c.meetup.name,
            scheduledAt: c.meetup.scheduledAt,
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
