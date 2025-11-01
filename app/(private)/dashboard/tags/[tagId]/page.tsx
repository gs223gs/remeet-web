import Link from "next/link";
import React from "react";

import { getContactsByTag } from "@/app/(private)/dashboard/tags/[tagId]/_server/server";

export default async function TagContactsPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;
  const contactsByTag = await getContactsByTag(tagId);

  if (!contactsByTag.ok) return <p>{contactsByTag.error.code}</p>; //TODO 後でなおす

  const contacts = contactsByTag.data ?? [];

  if (contacts.length === 0) {
    return <p>このタグに紐づくコンタクトはいません。</p>;
  }

  return (
    <div className="space-y-4 grid grid-cols-3 gap-4">
      {contacts.map((contact) => {
        const meetup = contact.meetup;

        return (
          <div key={contact.id} className="border p-4 space-y-3">
            <div className="space-y-1">
              <p>ID: {contact.id}</p>
              <p>名前: {contact.name}</p>
              <p>会社: {contact.company ?? "なし"}</p>
              <p>役職: {contact.role ?? "なし"}</p>
            </div>

            <div className="space-y-1">
              <p>関連ミートアップ:</p>
              {meetup ? (
                <div className="ml-4 space-y-1">
                  <p>名前: {meetup.name}</p>
                  <p>開催日: {meetup.scheduledAt.toISOString()}</p>
                  <Link
                    href={`/dashboard/meetup/${meetup.id}/contacts/${contact.id}`}
                    className="underline"
                  >
                    詳細を見る
                  </Link>
                </div>
              ) : (
                <p className="ml-4">紐づくミートアップはありません</p>
              )}
            </div>

            <div className="space-y-1">
              <p>リンク:</p>
              <div className="ml-4 space-y-1">
                {contact.links && contact.links.length > 0 ? (
                  contact.links.map((link) => (
                    <div key={link.id} className="space-y-1">
                      <p>種別: {link.type}</p>
                      <p>URL: {link.url}</p>
                      <p>ハンドル: {link.handle ?? "なし"}</p>
                    </div>
                  ))
                ) : (
                  <p>リンクは登録されていません</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p>タグ:</p>
              <div className="ml-4 space-y-1">
                {contact.tags && contact.tags.length > 0 ? (
                  contact.tags.map((tag) => <p key={tag.id}>{tag.name}</p>)
                ) : (
                  <p>タグはありません</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
