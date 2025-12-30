import type { Meta, StoryObj } from "@storybook/react";

import { ContactsErrorCard } from "@/components/contacts/contacts-error-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TagContactsHeader } from "@/components/tag/display/TagContactsHeader";
import { TagContactsList } from "@/components/tag/display/TagContactsList";
import type { TagContact, Tag } from "@/type/private/tags/tags";
import type { Result } from "@/type/error/error";

import { mockTagContacts, sampleTag } from "./tag-contacts-mocks";

type TagContactsPagePreviewProps = {
  tagResult: Result<Tag>;
  contactsResult: Result<TagContact[]>;
};

function TagContactsPagePreview({
  tagResult,
  contactsResult,
}: TagContactsPagePreviewProps) {
  if (!tagResult.ok) {
    return (
      <div className="px-4 py-10">
        <ContactsErrorCard message={tagResult.error?.message?.join(" / ")} />
      </div>
    );
  }

  if (!contactsResult.ok) {
    return (
      <div className="px-4 py-10">
        <ContactsErrorCard
          message={contactsResult.error?.message?.join(" / ")}
        />
      </div>
    );
  }

  const tag = tagResult.data;
  const contacts = contactsResult.data ?? [];

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="tag detail"
          title={`${tag.name} のコンタクト`}
          description="タグに紐づくコンタクトを確認し、フォローアップに活用しましょう。"
        />
        <TagContactsHeader tagId={tag.id} />
      </div>

      <section>
        <div className="space-y-4">
          <TagContactsList contacts={contacts} tagName={tag.name} />
        </div>
      </section>
    </div>
  );
}

const defaultState: TagContactsPagePreviewProps = {
  tagResult: {
    ok: true,
    data: sampleTag,
  },
  contactsResult: {
    ok: true,
    data: mockTagContacts,
  },
};

const emptyState: TagContactsPagePreviewProps = {
  tagResult: {
    ok: true,
    data: sampleTag,
  },
  contactsResult: {
    ok: true,
    data: [],
  },
};

const tagErrorState: TagContactsPagePreviewProps = {
  tagResult: {
    ok: false,
    error: {
      code: "not_found",
      message: ["タグ情報を取得できませんでした"],
    },
  },
  contactsResult: {
    ok: true,
    data: [],
  },
};

const contactsErrorState: TagContactsPagePreviewProps = {
  tagResult: {
    ok: true,
    data: sampleTag,
  },
  contactsResult: {
    ok: false,
    error: {
      code: "db_error",
      message: ["タグに紐づくコンタクトの取得に失敗しました"],
    },
  },
};

const meta = {
  title: "Tags/TagContactsPage",
  component: TagContactsPagePreview,
  parameters: {
    layout: "fullscreen",
  },
  args: defaultState,
} satisfies Meta<typeof TagContactsPagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyContacts: Story = {
  args: emptyState,
};

export const TagFetchError: Story = {
  args: tagErrorState,
};

export const ContactsFetchError: Story = {
  args: contactsErrorState,
};
