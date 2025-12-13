import { Sparkles } from "lucide-react";
import Link from "next/link";

import type { Tag as TagType } from "@/type/private/tags/tags";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/util/routes";

type TagWithCount = TagType & { count: number };

type Props = {
  topTag?: TagWithCount | null;
};

export const TagsOverviewCard = ({ topTag }: Props) => {
  return (
    <Card className="h-fit">
      <div className="rounded-xl px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">最多タグ</p>
            <p className="text-lg font-semibold">
              {topTag ? topTag.name : "未登録"}
            </p>
          </div>
        </div>
        {topTag ? (
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p className="text-xs uppercase tracking-wide text-orange-500">
              {topTag.count}人がこのタグに紐づいています
            </p>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="w-full border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              <Link href={routes.dashboardTagDetail(topTag.id)}>
                タグ詳細を開く
              </Link>
            </Button>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            タグを登録して活用状況を確認しましょう。
          </p>
        )}
      </div>
    </Card>
  );
};
