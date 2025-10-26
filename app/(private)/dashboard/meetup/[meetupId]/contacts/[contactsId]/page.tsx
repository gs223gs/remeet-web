import { getContactDetail } from "../_server/server";

export default async function ContactsDetail({
  params,
}: {
  params: Promise<{ meetupId: string; contactsId: string }>;
}) {
  const { meetupId, contactsId } = await params;
  const res = await getContactDetail(contactsId);

  if (!res.ok) {
    return (
      <div>
        <div>meetup: {meetupId}</div>
        <div>contacts: {contactsId}</div>
        <div>エラー</div>
        {res.error?.message?.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    );
  }

  const d = res.data;

  return (
    <div className="m-1 outline">
      <div>名前: {d.name}</div>
      <div>会社: {d.company ?? ""}</div>
      <div>役割: {d.role ?? ""}</div>
      <div>説明: {d.description ?? ""}</div>
      <div className="m-1 outline">
        リンク:
        {(d.links ?? []).map((l) => (
          <div key={l.id} className="m-1 outline">
            <div>type: {String(l.type)}</div>
            <div>url: {l.url}</div>
            <div>handle: {l.handle ?? ""}</div>
          </div>
        ))}
      </div>
      <div className="m-1 outline">
        タグ:
        {(d.tags ?? []).map((t) => (
          <div key={t.id} className="m-1 outline">
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}
