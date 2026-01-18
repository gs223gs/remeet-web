"use client";
import { useState } from "react";

import type { Tag } from "@/type/private/tags/tags";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { UseFormReturn } from "react-hook-form";

import { createTag } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  setTagQuery: (s: string) => void;
  tagQuery: string;
  selectTags: Tag[];
  setSelectTags: (t: Tag[]) => void;
  form: UseFormReturn<CreateContactsSchema>;
};

export const CreateTagForm = ({
  tagQuery,
  setTagQuery,
  setSelectTags,
  selectTags,
  form,
}: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [functionMessage, setFunctionMessage] = useState<string[]>([]);

  //TODO 今後のupdateについて
  // tagQueryに既存タグがあった場合はserver に行く前にsetSelectedTagする
  const addTag = async () => {
    if (isPending) return;

    if (!tagQuery.trim()) {
      setFunctionMessage(["タグ名を入力してください"]);
      return;
    }

    setIsPending(true);

    try {
      const createdTags = await createTag(tagQuery);

      if (!createdTags.ok) {
        setFunctionMessage(["タグの作成に失敗しました"]);
        return;
      }

      const updatedTags = [createdTags.data, ...selectTags];
      //ここ prev => の方がいいかも
      setSelectTags(updatedTags);
      form.setValue(
        "tags",
        updatedTags.map((st) => {
          return st.id;
        }),
        { shouldValidate: true },
      );

      setTagQuery("");
      setFunctionMessage([]);
    } finally {
      setIsPending(false);
    }
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
