import { getMeetup } from "./_server/server";
import Link from "next/link";
export default async function Meetup() {
  const res = await getMeetup();

  if (!res.ok) {
    return <div>情報取得に失敗しました</div>;
  }

  const list = res.data;

  return (
    <div>
      <div>Meetups</div>
      <div className="m-2 flex  gap-4">
        {list.length === 0 ? (
          <div>データがありません</div>
        ) : (
          list.map((m) => (
            <Link key={m.meetup.id} href={`/dashboard/meetup/${m.meetup.id}`}>
              <div className=" outline ">
                <div>id: {m.meetup.id}</div>
                <div>name: {m.meetup.name}</div>
                <div>scheduledAt: {m.meetup.scheduledAt.toString()}</div>
                <div>contactsCount: {m.contactsCount}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
