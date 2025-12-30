import type { TagContact } from "@/type/private/tags/tags";

export const sampleTag = {
  id: "tag-saas",
  name: "SaaS",
};

export const mockTagContacts: TagContact[] = [
  {
    id: "contact-1",
    name: "山田 太郎",
    company: "Acme Labs",
    role: "Product Manager",
    description: "SaaSの改善を推進しているPMです。",
    links: [
      {
        id: "link-1",
        type: "GITHUB",
        url: "yamada-taro",
        handle: "yamada-taro",
      },
      {
        id: "link-2",
        type: "TWITTER",
        url: "yamada_taro",
        handle: "@yamada_taro",
      },
    ],
    tags: [
      { id: "tag-saas", name: "SaaS" },
      { id: "tag-growth", name: "Growth" },
      { id: "tag-product", name: "プロダクト" },
    ],
    meetup: {
      id: "meetup-1",
      name: "Tokyo Builders Meetup #12",
      scheduledAt: new Date("2024-08-10T19:00:00+09:00"),
    },
  },
  {
    id: "contact-2",
    name: "佐藤 花子",
    company: "Nexa Inc.",
    role: "Developer Relations",
    description: "コミュニティを通じてプロダクト採用を支援しています。",
    links: [
      {
        id: "link-3",
        type: "WEBSITE",
        url: "https://community-note.example.com",
      },
      {
        id: "link-4",
        type: "OTHER",
        url: "https://note.com/hanako",
      },
      {
        id: "link-5",
        type: "PRODUCT",
        url: "https://nexa.app/demo",
      },
    ],
    tags: [
      { id: "tag-saas", name: "SaaS" },
      { id: "tag-community", name: "コミュニティ" },
    ],
    meetup: {
      id: "meetup-2",
      name: "SaaS Growth Night #20",
      scheduledAt: new Date("2024-09-04T18:30:00+09:00"),
    },
  },
];
