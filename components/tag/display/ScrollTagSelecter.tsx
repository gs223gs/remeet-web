"use client";

import type { Tag } from "@/type/private/tags/tags";

import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  userTags: Tag[];
  tagQuery: string;
  onTagSelect: (t: Tag) => void;
};
export const ScrollTagSelector = ({
  userTags,
  tagQuery,
  onTagSelect,
}: Props) => {
  return (
    <ScrollArea className="h-72 w-full rounded-lg border border-dashed">
      <div className="divide-y divide-border/60">
        {userTags
          .filter((ut) =>
            ut.name.toLowerCase().includes(tagQuery.toLowerCase()),
          )
          .map((t) => (
            <button
              key={t.id}
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-muted/40"
              onClick={() => onTagSelect(t)}
            >
              <span>{t.name}</span>
              <span className="text-xs uppercase text-muted-foreground">
                追加
              </span>
            </button>
          ))}
      </div>
    </ScrollArea>
  );
};
