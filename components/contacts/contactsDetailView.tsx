import Link from "next/link";

import { DeleteContactForm } from "./form/deleteContactForm";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";

type ContactsDetailViewProps = {
  meetupId: string;
  contactsDetail: ContactsDetailDTO;
};
export const ContactsDetailView = ({
  meetupId,
  contactsDetail,
}: ContactsDetailViewProps) => {
  //この編集ページと表示ページを同時に担うのRSC的にどうなんだろう
  return (
    <div className="m-1 outline">
      <div>名前: {contactsDetail.name}</div>
      <div>会社: {contactsDetail.company ?? ""}</div>
      <div>役割: {contactsDetail.role ?? ""}</div>
      <div>説明: {contactsDetail.description ?? ""}</div>
      <div className="m-1 outline">
        リンク:
        {(contactsDetail.links ?? []).map((l) => (
          <div key={l.id} className="m-1 outline">
            <div>type: {String(l.type)}</div>
            <div>url: {l.url}</div>
            <div>handle: {l.handle ?? ""}</div>
          </div>
        ))}
      </div>
      <div className="m-1 outline">
        タグ:
        {(contactsDetail.tags ?? []).map((t) => (
          <div key={t.id} className="m-1 outline">
            {t.name}
          </div>
        ))}
      </div>
      <Link
        href={`/dashboard/meetup/${meetupId}/contacts/${contactsDetail.id}/edit`}
      >
        編集
      </Link>
      <DeleteContactForm contactId={contactsDetail.id} meetupId={meetupId} />
    </div>
  );
};
