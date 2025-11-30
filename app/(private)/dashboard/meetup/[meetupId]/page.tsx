import Link from "next/link";

import { getMeetupDetailSummary } from "../_server/server";

import type { MeetupDetailContact } from "@/type/private/meetup/meetup";

import { MeetupOverview } from "@/components/meetup//display/meetupOverview";

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
            <ContactSummary key={c.id} meetupId={meetupId} contactSummary={c} />
          );
        })}
      </div>
    </div>
  );
}

type contactsSummaryProps = {
  meetupId: string;
  contactSummary: MeetupDetailContact;
};

const ContactSummary = ({ meetupId, contactSummary }: contactsSummaryProps) => {
  return (
    <Link href={`/dashboard/meetup/${meetupId}/contacts/${contactSummary.id}/`}>
      <div className=" outline-2 m-2">
        <div>{contactSummary.name}</div>
        <div>{contactSummary.role}</div>
        <div>{contactSummary.company}</div>
        <div>
          {contactSummary.tags.map((t) => {
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
};
