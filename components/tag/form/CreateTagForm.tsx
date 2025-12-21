"use client";
import { useState } from "react";

import type { Tag } from "@/type/private/tags/tags";

import { createTag } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  setTagQuery: (s: string) => void;
  tagQuery: string;
  selectTags: Tag[];
  setSelectTags: (t: Tag[]) => void;
};

export const CreateTagForm = ({
  tagQuery,
  setTagQuery,
  setSelectTags,
  selectTags,
}: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [functionMessage, setFunctionMessage] = useState<string[]>([]);

  //TODO 今後のupdateについて
  // tagQueryに既存タグがあった場合はserver に行く前にsetSelectedTagする
  const addTag = async () => {
    if (!tagQuery) {
      setFunctionMessage(["タグ名を入力してください"]);
      return;
    }
    setIsPending(true);
    const createdTags = await createTag(tagQuery);
    if (createdTags.ok) {
      setSelectTags([
        {
          id: createdTags.data.id,
          name: createdTags.data.name,
        },
        ...selectTags,
      ]);
      setTagQuery("");
      setFunctionMessage([]);
    }
    if (!createdTags.ok) {
      setFunctionMessage(createdTags.error.message);
    }
    setIsPending(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          type="text"
          placeholder="タグ名を入力"
          disabled={isPending}
          value={tagQuery}
          onChange={(e) => {
            setTagQuery(e.target.value);
          }}
          onKeyDown={async (e) => {
            //IME変換中なら即時return
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") {
              e.preventDefault();
              await addTag();
            }
          }}
        />

        <Button
          type="button"
          disabled={isPending}
          onClick={async (e) => {
            e.preventDefault();
            await addTag();
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
