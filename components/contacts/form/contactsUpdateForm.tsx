"use client";

import { useState, useActionState } from "react";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { Tag } from "@/type/private/tags/tags";
import type { LinkType } from "@prisma/client";

import { updateContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { NewTag } from "@/components/tag/form/newTag";

type ContactsUpdateFormProps = {
  meetupId: string;
  tags: Tag[];
  contactsDetail: ContactsDetailDTO;
  setIsEdit: (arg0: boolean) => void;
};
export default function ContactsUpdateForm({
  contactsDetail,
  tags,
  meetupId,
}: ContactsUpdateFormProps) {
  const updateContactsWithMeetupId = updateContacts.bind(
    null,
    meetupId,
    contactsDetail.id,
  );
  const [selectTags, setSelectTags] = useState<Tag[]>(
    contactsDetail.tags ? [...contactsDetail.tags] : [],
  );
  const [contactTags, setContactTags] = useState<Tag[]>(() =>
    tags.filter(
      (tag) => !contactsDetail.tags?.some((selected) => selected.id === tag.id),
    ),
  );
  const [newTag, setNewTag] = useState<string>("");

  const findLinkByType = (type: LinkType) =>
    contactsDetail.links?.find((link) => link.type === type);

  const githubLink = findLinkByType("GITHUB");
  const twitterLink = findLinkByType("TWITTER");
  const websiteLink = findLinkByType("WEBSITE");
  const productLink = findLinkByType("PRODUCT");
  const otherLink = findLinkByType("OTHER");

  const [state, action, isPending] = useActionState(
    updateContactsWithMeetupId,
    {
      success: false,
      errors: {},
    },
  );

  if (isPending) return <div>pending</div>;

  return (
    //TODO これ別コンポーネントに分けれそう
    <form action={action} className="flex flex-col m-4 outline">
      {state.success ? <p>true</p> : <p>false</p>}
      name:
      <input
        type="text"
        name="name"
        placeholder="name"
        defaultValue={contactsDetail.name}
      />
      comp:{" "}
      <input
        type="text"
        name="company"
        placeholder="company"
        defaultValue={contactsDetail.company ?? ""}
      />
      role:{" "}
      <input
        type="text"
        name="role"
        placeholder="role"
        defaultValue={contactsDetail.role ?? ""}
      />
      disc:{" "}
      <textarea
        name="description"
        defaultValue={contactsDetail.description ?? ""}
      />
      <NewTag
        newTag={newTag}
        setNewTag={setNewTag}
        setSelectTags={setSelectTags}
        selectTags={selectTags}
      />
      <div className="outline m-5">
        {contactTags.map((t) => {
          return (
            <div
              className="outline"
              key={t.id}
              onClick={() => {
                setSelectTags((prev) =>
                  prev.some((st) => st.id === t.id) ? prev : [...prev, t],
                );
                setContactTags((prev) => prev.filter((c) => c.id !== t.id));
              }}
            >
              {t.name}
            </div>
          );
        })}
      </div>
      <div className="outline m-5">
        {/*TODO あとでセレクトボックスにする */}
        {selectTags.map((t) => {
          return (
            <div key={t.id} className="outline flex">
              <input defaultValue={t.id} name="tags" type="hidden" />
              <span>{t.name}</span>
              <button
                onClick={() => {
                  setSelectTags((prev) => prev.filter((st) => st.id !== t.id));
                  setContactTags((prev) =>
                    prev.some((ct) => ct.id === t.id) ? prev : [t, ...prev],
                  );
                }}
                className=" outline"
                type="button"
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <span>
          handle:
          <input
            type="text"
            name="githubHandle"
            defaultValue={githubLink?.handle ?? ""}
          />
        </span>
        <span>
          id:
          <input
            type="text"
            name="githubId"
            defaultValue={githubLink?.url ?? ""}
          />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input
            type="text"
            name="twitterHandle"
            defaultValue={twitterLink?.handle ?? ""}
          />
        </span>
        <span>
          id:
          <input
            type="text"
            name="twitterId"
            defaultValue={twitterLink?.url ?? ""}
          />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input
            type="text"
            name="websiteHandle"
            defaultValue={websiteLink?.handle ?? ""}
          />
        </span>
        <span>
          id:
          <input
            type="text"
            name="websiteUrl"
            defaultValue={websiteLink?.url ?? ""}
          />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input
            type="text"
            name="productHandle"
            defaultValue={productLink?.handle ?? ""}
          />
        </span>
        <span>
          id:
          <input
            type="text"
            name="productUrl"
            defaultValue={productLink?.url ?? ""}
          />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input
            type="text"
            name="otherHandle"
            defaultValue={otherLink?.handle ?? ""}
          />
          <span>
            id:
            <input
              type="text"
              name="other"
              defaultValue={otherLink?.url ?? ""}
            />
          </span>
        </span>
      </div>
      <button type="submit">送信</button>
    </form>
  );
}
