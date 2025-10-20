import { getMeetup } from "./_server/server";

export default async function Meetup() {
  const res = await getMeetup();

  if (!res.ok) {
    return <div>情報取得に失敗しました</div>;
  }

  const list = res.data;

  return (
    <div>
      <div>Meetups</div>
      <div>
        {list.length === 0 ? (
          <div>データがありません</div>
        ) : (
          list.map((m) => (
            <div key={m.meetup.id} className=" outline m-2">
              <div>id: {m.meetup.id}</div>
              <div>name: {m.meetup.name}</div>
              <div>scheduledAt: {m.meetup.scheduledAt.toString()}</div>
              <div>contactsCount: {m.contactsCount}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
