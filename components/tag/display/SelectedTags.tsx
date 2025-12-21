"use client";

import type { Tag } from "@/type/private/tags/tags";

type Props = {
  selectedTags: Tag[];
  onTagDeselect: (t: Tag) => void;
};
export const SelectedTags = ({ selectedTags, onTagDeselect }: Props) => {
  return (
    <div className="px-3 py-2">
      {selectedTags.length ? (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((t) => (
            <button
              key={t.id}
              type="button"
              className="flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-sm text-foreground shadow-sm transition hover:border-orange-300 hover:text-orange-600"
              onClick={() => onTagDeselect(t)}
            >
              {t.name}
              <span className="text-xs text-muted-foreground">削除</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          タグを選択するとここに表示されます。
        </p>
      )}
    </div>
  );
};
