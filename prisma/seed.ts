import { PrismaClient, LinkType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Demo user
  const demoPassword = await bcrypt.hash("demo1234", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
      passwordHash: demoPassword,
      emailVerified: true,
    },
  });

  // Profile
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      name: "Demo User",
      job: "Software Engineer",
      company: "Example Inc.",
      description: "This is a demo profile for development.",
      githubUrl: "https://github.com/demo",
      profileUrl: "https://example.com/demo",
    },
    create: {
      userId: user.id,
      name: "Demo User",
      job: "Software Engineer",
      company: "Example Inc.",
      description: "This is a demo profile for development.",
      githubUrl: "https://github.com/demo",
      profileUrl: "https://example.com/demo",
    },
  });

  // Tags (unique per user: (userId, name))
  const tagNames = ["Engineer", "Designer", "Product"] as const;
  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { userId_name: { userId: user.id, name } },
        update: {},
        create: { userId: user.id, name },
      }),
    ),
  );

  // Meetups
  const now = new Date();
  const meetups = await Promise.all([
    prisma.meetup.create({
      data: {
        userId: user.id,
        name: "Next.js Meetup",
        scheduledAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      },
    }),
    prisma.meetup.create({
      data: {
        userId: user.id,
        name: "TypeScript Tokyo",
        scheduledAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  // Contacts with links
  const alice = await prisma.contact.create({
    data: {
      userId: user.id,
      name: "Alice Tanaka",
      company: "Startup A",
      role: "Engineer",
      description: "Interested in DX tooling.",
      links: {
        create: [
          { type: LinkType.GITHUB, url: "https://github.com/alice" },
          { type: LinkType.WEBSITE, url: "https://alice.dev" },
        ],
      },
      tags: {
        create: [{ tagId: tags[0].id }],
      },
    },
  });

  const bob = await prisma.contact.create({
    data: {
      userId: user.id,
      name: "Bob Suzuki",
      company: "Design Co.",
      role: "Designer",
      description: "UX and accessibility focused.",
      links: {
        create: [
          { type: LinkType.WEBSITE, url: "https://bob.design" },
          { type: LinkType.TWITTER, url: "https://twitter.com/bob" },
        ],
      },
      tags: {
        create: [{ tagId: tags[1].id }],
      },
    },
  });

  // Contact-Meetup context
  await prisma.contactMeetup.createMany({
    data: [
      {
        contactId: alice.id,
        meetupId: meetups[0].id,
        note: "Talked about React Server Components.",
        rating: 5,
        metAt: now,
      },
      {
        contactId: bob.id,
        meetupId: meetups[1].id,
        note: "Discussed design systems and a11y.",
        rating: 4,
        metAt: now,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
