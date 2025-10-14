import { getUserDashboardSummary } from "./_server/server";

export default async function page() {
  const summary = await getUserDashboardSummary();

  if (!summary.ok) return <div>何かしらのエラーです</div>;

  return (
    <div>
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
    </div>
  );
}
