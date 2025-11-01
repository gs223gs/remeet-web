import Link from "next/link";

import { getMeetupDetailSummary } from "../_server/server";

export default async function MeetupDetail({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const detail = await getMeetupDetailSummary(meetupId);
  if (!detail.ok) return <div>error</div>;
  return (
    <div>
      <div className=" text-3xl">出会った人:{detail.data.contactCount}</div>
      <Link href={`/dashboard/meetup/${meetupId}/contacts/new`}>new</Link>
      <div>meetup名: {detail.data.detailWithContacts.detail.name}</div>
      <div className="m-1 flex ">
        {detail.data.detailWithContacts.contacts.map((c) => {
          return (
            <Link
              key={c.id}
              href={`/dashboard/meetup/${meetupId}/contacts/${c.id}/`}
            >
              <div className=" outline-2 m-2">
                <div>{c.name}</div>
                <div>{c.role}</div>
                <div>{c.company}</div>
                <div>
                  {c.tags.map((t) => {
                    return (
                      <div key={t} className=" outline-2 m-2">
                        {t}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href={`/dashboard/meetup/${meetupId}/edit`}>meetupの編集</Link>
    </div>
  );
}
