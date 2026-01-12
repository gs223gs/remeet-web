import Link from "next/link";

import { DeleteTagForm } from "@/components/tag/form/DeleteTagForm";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/util/DeleteDialog";
import { routes } from "@/util/routes";

type Props = {
  tagId: string;
};

export const TagContactsHeader = ({ tagId }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
      >
        <Link href={routes.dashboardTags()}>タグ一覧へ戻る</Link>
      </Button>
      <Button
        asChild
        size="sm"
        className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
      >
        <Link href={routes.dashboardTagEdit(tagId)}>タグを編集</Link>
      </Button>
      <DeleteDialog trigger="タグを削除">
        <DeleteTagForm tagId={tagId} />
      </DeleteDialog>
    </div>
  );
};
