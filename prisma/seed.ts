import { PrismaClient, LinkType } from "@prisma/client";

const prisma = new PrismaClient();

// 固定ユーザーID（必要なら環境変数で上書き可）
const USER_ID = process.env.SEED_USER_ID || "cmh6o2t4300006q82a1f3kjhm";

async function ensureUser() {
  // OAuth運用想定: 既存ユーザーがいなければ最低限の行を用意
  const email = "seed-user@example.com";
  const name = "Seed User";
  await prisma.user.upsert({
    where: { id: USER_ID },
    update: { name },
    create: {
      id: USER_ID,
      email,
      name,
    },
  });
}

async function clearUserData() {
  // このユーザー配下のデータだけ削除（順序に注意）
  await prisma.$transaction([
    // Contact 関連
    prisma.contactTag.deleteMany({ where: { contact: { userId: USER_ID } } }),
    prisma.contactMeetup.deleteMany({
      where: { contact: { userId: USER_ID } },
    }),
    prisma.contactLink.deleteMany({ where: { contact: { userId: USER_ID } } }),
    prisma.contact.deleteMany({ where: { userId: USER_ID } }),
    // Meetup 関連
    prisma.contactMeetup.deleteMany({ where: { meetup: { userId: USER_ID } } }),
    prisma.meetup.deleteMany({ where: { userId: USER_ID } }),
    // Tag
    prisma.contactTag.deleteMany({ where: { tag: { userId: USER_ID } } }),
    prisma.tag.deleteMany({ where: { userId: USER_ID } }),
  ]);
}

async function seedTags() {
  const tagNames = ["Friend", "Colleague", "VIP"];
  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { userId_name: { userId: USER_ID, name } },
        update: {},
        create: { userId: USER_ID, name },
      }),
    ),
  );
  return tags;
}

async function seedContacts() {
  const contacts = await prisma.$transaction([
    prisma.contact.create({
      data: {
        userId: USER_ID,
        name: "Alice Johnson",
        company: "Acme Inc.",
        role: "Engineer",
        links: {
          create: [
            { type: LinkType.GITHUB, url: "https://github.com/alice" },
            { type: LinkType.TWITTER, url: "https://x.com/alice" },
          ],
        },
      },
    }),
    prisma.contact.create({
      data: {
        userId: USER_ID,
        name: "Bob Smith",
        company: "Beta LLC",
        role: "PM",
        links: {
          create: [{ type: LinkType.WEBSITE, url: "https://bob.example.com" }],
        },
      },
    }),
    prisma.contact.create({
      data: {
        userId: USER_ID,
        name: "Carol Tan",
        company: "Startup XYZ",
        role: "Founder",
      },
    }),
  ]);
  return contacts;
}

async function seedMeetups(contactIds: string[]) {
  const now = new Date();
  const recent = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3); // 3日前
  const older = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30); // 30日前

  const m1 = await prisma.meetup.create({
    data: {
      userId: USER_ID,
      name: "Monthly Dev Meetup",
      scheduledAt: recent,
      contacts: {
        create: contactIds.slice(0, 2).map((contactId) => ({ contactId })),
      },
    },
  });

  const m2 = await prisma.meetup.create({
    data: {
      userId: USER_ID,
      name: "Product Launch Night",
      scheduledAt: older,
      contacts: {
        create: contactIds.slice(1).map((contactId) => ({ contactId })),
      },
    },
  });

  return [m1, m2];
}

async function seedContactTags(tagIds: string[], contactIds: string[]) {
  // 簡単にいくつか関連付け
  const ops = [
    prisma.contactTag.create({
      data: { contactId: contactIds[0], tagId: tagIds[0] },
    }),
    prisma.contactTag.create({
      data: { contactId: contactIds[1], tagId: tagIds[1] },
    }),
    prisma.contactTag.create({
      data: { contactId: contactIds[2], tagId: tagIds[2] },
    }),
  ];
  await prisma.$transaction(ops);
}

async function main() {
  console.log("Seeding start for user:", USER_ID);
  await ensureUser();
  await clearUserData();
  const tags = await seedTags();
  const contacts = await seedContacts();
  const meetups = await seedMeetups(contacts.map((c) => c.id));
  await seedContactTags(
    tags.map((t) => t.id),
    contacts.map((c) => c.id),
  );
  console.log("Seeded:", {
    userId: USER_ID,
    tags: tags.length,
    contacts: contacts.length,
    meetups: meetups.length,
  });
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
