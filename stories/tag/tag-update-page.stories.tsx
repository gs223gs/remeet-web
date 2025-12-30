import Link from "next/link";

import type { Meta, StoryObj } from "@storybook/react";
import { Info, Tag as TagIcon } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DeleteTagForm } from "@/components/tag/form/DeleteTagForm";
import { UpdateTagForm } from "@/components/tag/form/UpdateTagForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Result } from "@/type/error/error";
import type { Tag } from "@/type/private/tags/tags";
import { routes } from "@/util/routes";

import { sampleTag } from "./tag-contacts-mocks";

type TagUpdatePagePreviewProps = {
  tagResult: Result<Tag>;
};

function TagUpdatePagePreview({ tagResult }: TagUpdatePagePreviewProps) {
  if (!tagResult.ok) {
    const errorMessage = tagResult.error?.message?.join(" / ");

    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>タグ情報の取得に失敗しました</CardTitle>
            <CardDescription>
              {errorMessage ?? "時間をおいて再度お試しください。"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
            >
              <Link href={routes.dashboardTags()}>タグ一覧へ戻る</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const tag = tagResult.data;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="tags"
          title={`${tag.name} を編集`}
          description="タグ名を整えることで、ダッシュボードや検索結果で迷わずつながりを探せます。"
        />
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
            <Link href={routes.dashboardTagDetail(tag.id)}>タグ詳細を開く</Link>
          </Button>
          <DeleteTagForm tagId={tag.id} />
        </div>
      </div>
    </div>
  );
}

const defaultState: TagUpdatePagePreviewProps = {
  tagResult: {
    ok: true,
    data: sampleTag,
  },
};

const fetchErrorState: TagUpdatePagePreviewProps = {
  tagResult: {
    ok: false,
    error: {
      code: "not_found",
      message: ["タグ情報を取得できませんでした"],
    },
  },
};

const meta = {
  title: "Tags/TagUpdatePage",
  component: TagUpdatePagePreview,
  parameters: {
    layout: "fullscreen",
  },
  args: defaultState,
} satisfies Meta<typeof TagUpdatePagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FetchError: Story = {
  args: fetchErrorState,
};
