//contactRepoだけでいいかもしれない
//今後調査して削除するかも
import type { Result } from "@/type/error/error";
import type { ContactLink } from "@/type/private/contacts/contacts";
import type { Prisma } from "@prisma/client";

//service でcontactId単体で送らせた方がservice側の可読性が上がる
type ContactLinkInput = Omit<ContactLink, "id">;

export const linkRepository = {
  async deleteByContactId(
    db: Prisma.TransactionClient,
    contactId: string,
  ): Promise<Result<void>> {
    try {
      await db.contactLink.deleteMany({
        where: { contactId },
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
  },
  async create(
    db: Prisma.TransactionClient,
    contactId: string,
    links: ContactLinkInput[],
  ): Promise<Result<void>> {
    try {
      await db.contactLink.createMany({
        data: links.map((l) => ({ ...l, contactId })),
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
  },
};
