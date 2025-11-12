import Link from "next/link";

import { getMeetupDetailSummary } from "../_server/server";

import { MeetupOverview } from "@/components/meetup/meetupOverview";

export default async function MeetupDetail({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const detail = await getMeetupDetailSummary(meetupId);

  if (!detail.ok) return <div>error</div>;

  const meetupDetail = detail.data.detailWithContacts.detail;
  return (
    <div>
      <MeetupOverview
        meetupDetail={meetupDetail}
        meetupContactsCount={detail.data.contactCount}
      />
      <Link href={`/dashboard/meetup/${meetupId}/contacts/new`}>new</Link>
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
    </div>
  );
}
