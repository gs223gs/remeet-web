import { getMeetupDetailSummary } from "../_server/server";

export default async function MeetupDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const detail = await getMeetupDetailSummary(id);
  if (!detail.ok) return <div>error</div>;
  return (
    <div>
      <div className=" text-3xl">出会った人:{detail.data.contactCount}</div>
      <div>meetup名: {detail.data.detailWithContacts.detail.name}</div>
      <div className="m-1">
        {detail.data.detailWithContacts.contacts.map((c) => {
          return (
            <div key={c.id} className=" outline-2 m-2">
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
          );
        })}
      </div>
    </div>
  );
}
