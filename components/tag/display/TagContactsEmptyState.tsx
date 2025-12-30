import Link from "next/link";

import { Button } from "@/components/ui/button";
import { routes } from "@/util/routes";

type Props = {
  tagName: string;
};

export const TagContactsEmptyState = ({ tagName }: Props) => {
  return (
    <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 px-6 py-10 text-center">
      <p className="text-sm text-muted-foreground">
        まだ「{tagName}
        」タグにはコンタクトが紐づいていません。Meetup詳細ページでコンタクトを登録しましょう。
      </p>
      <Button
        asChild
        size="sm"
        className="mt-4 bg-orange-500 text-white hover:bg-orange-500/90"
      >
        <Link href={routes.dashboardMeetupList()}>Meetup一覧を開く</Link>
      </Button>
    </div>
  );
};
