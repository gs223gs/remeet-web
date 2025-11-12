"use client";
import { useState, useTransition } from "react";

import type { Tag } from "@/type/private/tags/tags";

import { createTag } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";

type NewTagProps = {
  setNewTag: (s: string) => void;
  newTag: string;
  selectTags: Tag[];
  setSelectTags: (t: Tag[]) => void;
};

export const NewTag = ({
  newTag,
  setNewTag,
  setSelectTags,
  selectTags,
}: NewTagProps) => {
  const [isPending, startTransition] = useTransition();
  const [functionMessage, setFunctionMessage] = useState<string[]>([]);

  const addTag = async () => {
    const createdTags = await createTag(newTag);
    if (createdTags.ok) {
      setSelectTags([
        {
          id: createdTags.data.id,
          name: createdTags.data.name,
        },
        ...selectTags,
      ]);
      setNewTag("");
      setFunctionMessage([]);
    }
    if (!createdTags.ok) {
      setFunctionMessage(createdTags.error.message);
    }
  };

  if (isPending) return <p>追加中</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="タグを追加"
        onChange={(e) => {
          setNewTag(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === "Enter") {
            e.preventDefault();
            startTransition(addTag);
          }
        }}
        value={newTag}
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          startTransition(addTag);
        }}
      >
        追加
      </button>
      {functionMessage && <p>{functionMessage}</p>}
    </div>
  );
};
