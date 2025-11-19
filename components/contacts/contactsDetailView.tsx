"use client";
import { useState } from "react";

import ContactsUpdateForm from "./form/contactsUpdateForm";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { Tag } from "@/type/private/tags/tags";

type ContactsDetailViewProps = {
  meetupId: string;
  tags: Tag[];
  contactsDetail: ContactsDetailDTO;
};
export const ContactsDetailView = ({
  meetupId,
  tags,
  contactsDetail,
}: ContactsDetailViewProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  //この編集ページと表示ページを同時に担うのRSC的にどうなんだろう
  return isEdit ? (
    <ContactsUpdateForm
      meetupId={meetupId}
      tags={tags}
      contactsDetail={contactsDetail}
      setIsEdit={setIsEdit}
    />
  ) : (
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
      <button onClick={() => setIsEdit(true)}>編集</button>
    </div>
  );
};
