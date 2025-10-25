"use client";
type Props = {
  meetupId: string;
  tags: Tag[];
};

import { useActionState, useState } from "react";
import { createContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { Tag } from "@/type/private/contacts/contacts";
export default function RequiredForm({ meetupId, tags }: Props) {
  //formをCSR ページをSSR にする ページでタグを取得して form に props で渡す
  const createContactsWithMeetupId = createContacts.bind(null, meetupId);
  const [contactTags, setContactTags] = useState<Tag[]>([...tags]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<string>("");
  const [state, action, isPending] = useActionState(
    createContactsWithMeetupId,
    {
      success: false,
      errors: {},
    },
  );

  if (isPending) return <div>pending</div>;
  return (
    <form action={action} className="flex flex-col m-4 outline">
      {state.success ? <p>true</p> : <p>false</p>}
      name:
      <input type="text" name="name" placeholder="name" />
      comp: <input type="text" name="company" placeholder="company" />
      role: <input type="text" name="role" placeholder="role" />
      disc: <textarea name="description" />
      <div>
        <input
          type="text"
          placeholder="タグを追加"
          onChange={(e) => {
            setTag(e.target.value);
          }}
          value={tag}
        />
        <button
          type="button"
          onClick={() => {
            //TODO ここでDBにtagをsubmit して返り値を取りたい
            // createTag() //user id は session から
            setSelectTags([{ tagId: "", name: tag }, ...selectTags]);
            setTag("");
          }}
        >
          追加
        </button>
      </div>
      <div className="outline m-5">
        {contactTags.map((t) => {
          return (
            <div
              className="outline"
              key={t.tagId}
              onClick={() => {
                setSelectTags([...selectTags, t]);
                setContactTags([]);
                console.log("clicked");
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
            <div key={t.tagId} className="outline flex">
              <input defaultValue={t.tagId} name="tags" type="hidden" />
              <span>{t.name}</span>
              <button
                onClick={() => {
                  setSelectTags([...selectTags.filter((st) => st != t)]);
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
          <input type="text" name="githubHandle" />
        </span>
        <span>
          id:
          <input type="text" name="githubId" />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input type="text" name="twitterHandle" />
        </span>
        <span>
          id:
          <input type="text" name="twitterId" />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input type="text" name="websiteHandle" />
        </span>
        <span>
          id:
          <input type="text" name="websiteUrl" />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input type="text" name="productHandle" />
        </span>
        <span>
          id:
          <input type="text" name="productUrl" />
        </span>
      </div>
      <div>
        <span>
          handle:
          <input type="text" name="otherHandle" />
          <span>
            id: <input type="text" name="other" />
          </span>
        </span>
      </div>
      <button type="submit">送信</button>
    </form>
  );
}
