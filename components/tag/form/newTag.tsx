"use client";
import { useState, useTransition } from "react";

import type { Tag } from "@/type/private/tags/tags";

import { createTag } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          type="text"
          placeholder="タグ名を入力"
          disabled={isPending}
          value={newTag}
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
        />

        <Button
          type="button"
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            startTransition(addTag);
          }}
          className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
        >
          {isPending ? "作成中..." : "タグ新規作成"}
        </Button>
      </div>
      {functionMessage.length > 0 && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {functionMessage.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};
