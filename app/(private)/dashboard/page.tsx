import Link from "next/link";

import { getUserDashboardSummary } from "./_server/server";

import { ModeToggle } from "@/components/ui/color-mode-toggle";

export const dynamic = "force-dynamic";

export default async function page() {
  const summary = await getUserDashboardSummary();

  if (!summary.ok) return <div>何かしらのエラーです</div>;
  const id = "cmgqkfhg0000g6qqbc571th9w";
  return (
    <div>
      <ModeToggle />
      <div>{summary.data.meetupCount}</div>
      <div>{summary.data.thisYearContactCount}</div>
      <div>
        {summary.data.lastMeetupContacts.map((c) => {
          return (
            <div key={c.contactId}>
              <div>{c.contactName}</div>
              <div>{c.meetupName}</div>
              <div>{c.meetupScheduledAt.toISOString()}</div>
            </div>
          );
        })}
      </div>

      <Link href={"/dashboard/meetup/new"}>new</Link>
      <Link href={`/dashboard/meetup/${id}`}>詳細へ</Link>
      <Link href={"/dashboard/meetup"}>meetup</Link>
    </div>
  );
}
