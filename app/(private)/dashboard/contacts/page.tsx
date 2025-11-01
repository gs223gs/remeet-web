import Link from "next/link";
import React from "react";

import { getContacts } from "@/app/(private)/dashboard/contacts/_server/server";

export default async function MeetupContacts() {
  const contacts = await getContacts();
  if (!contacts.ok) return <p>何かしらのエラー</p>; //TODO 後でなおす
  // dashboard/meetup/${c.meetup.id}/contacts/${c.id}
  return (
    <div className="grid grid-cols-3  gap-4 m-3">
      {contacts.data.map((c) => (
        <div key={c.id} className="outline">
          {/*TODO Lintを型にする */}
          <Link href={`/dashboard/meetup/${c.meetup.id}/contacts/${c.id}`}>
            <div className="outline m-3">
              <div>Meetup:{c.meetup.name}</div>
              <div>{c.meetup.scheduledAt.toISOString()}</div>
            </div>
            <div className="outline m-3">
              <div>ID: {c.id}</div>
              <div>Name: {c.name}</div>
              <div>Company: {c.company ?? "なし"}</div>
              <div>Role: {c.role ?? "なし"}</div>
            </div>
          </Link>

          <div className="outline m-3">
            <div>Links:</div>
            <div>
              {c.links && c.links.length > 0 ? (
                c.links.map((l) => (
                  <div key={l.id}>
                    <div>ID: {l.id}</div>
                    <div>Type: {l.type}</div>
                    <div>Handle: {l.handle ?? "なし"}</div>
                    <div>URL: {l.url}</div>
                  </div>
                ))
              ) : (
                <div>リンクなし</div>
              )}
            </div>
          </div>

          <div className="outline m-3">
            <div>Tags:</div>
            <div>
              {c.tags && c.tags.length > 0 ? (
                c.tags.map((t) => (
                  <div key={t.id}>
                    <div>ID: {t.id}</div>
                    <div>Name: {t.name}</div>
                  </div>
                ))
              ) : (
                <div>タグなし</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
