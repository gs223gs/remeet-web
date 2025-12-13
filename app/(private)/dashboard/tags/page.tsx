import Link from "next/link";

import { getTagsWithRanking } from "@/app/(private)/dashboard/tags/_server/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TagsHeader } from "@/components/tag/display/tags-header";
import { TagsList } from "@/components/tag/display/tags-list";
import { TagsOverviewCard } from "@/components/tag/display/tags-overview-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/util/routes";

export default async function TagsPage() {
  const tags = await getTagsWithRanking();

  if (!tags.ok) {
    const errorMessage = tags.error?.message?.join(" / ");

    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>情報取得に失敗しました</CardTitle>
            <CardDescription>
              {errorMessage ?? "再度読み込みをお試しください。"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-500/90"
            >
              <Link href={routes.dashboard()}>ダッシュボードへ戻る</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const tagList = [...tags.data].sort((a, b) => {
    if (a.count === b.count) {
      return a.name.localeCompare(b.name, "ja");
    }

    return b.count - a.count;
  });
  const topTag = tagList[0] ?? null;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="tags"
          title="タグ管理"
          description="Meetupで出会ったつながりをタグで整理し、フォローアップを迷わず進めましょう。"
        />
        <TagsHeader />
      </div>

      <section className="flex flex-col gap-6">
        <div className="space-y-4">
          <TagsOverviewCard topTag={topTag} />
        </div>
        <TagsList tags={tagList} />
      </section>
    </div>
  );
}
