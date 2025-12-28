import { Link2, NotebookPen, Tags, UserRound } from "lucide-react";

import { DeleteContactForm } from "./form/deleteContactForm";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { linkLabels, createLinkUrl } from "@/util/contactLinkFormatter";
type Props = {
  meetupId: string;
  contactsDetail: ContactsDetailDTO;
};

export const ContactsDetailView = ({ meetupId, contactsDetail }: Props) => {
  const tags = contactsDetail.tags ?? [];
  const links = contactsDetail.links ?? [];
  const description =
    contactsDetail.description && contactsDetail.description.trim().length
      ? contactsDetail.description
      : "まだメモがありません。Meetup後の印象や話題を記録しておきましょう。";
  const infoItems = [
    {
      label: "所属",
      value: contactsDetail.company ?? "所属未登録",
    },
    {
      label: "役割",
      value: contactsDetail.role ?? "役職未登録",
    },
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,1fr)]">
      <Card className="border-muted bg-card">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              contact profile
            </p>
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {contactsDetail.name}
            </CardTitle>
            <CardDescription>
              {contactsDetail.role ?? "役職未登録"} ・{" "}
              {contactsDetail.company ?? "所属未登録"}
            </CardDescription>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <UserRound className="size-5" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-muted/40 px-4 py-3 text-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <NotebookPen className="size-4 text-orange-500" />
              メモ
            </div>
            <p className="rounded-xl bg-muted/40 px-4 py-3 text-sm text-foreground">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Tags className="size-4 text-blue-500" />
              タグ
            </div>
            {tags.length ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t.id}
                    className="rounded-full border border-dashed border-muted-foreground/40 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                タグが登録されていません。タグを使うと検索がしやすくなります。
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-muted bg-card">
          <CardHeader className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              online links
            </p>
            <CardTitle className="text-xl font-semibold text-foreground">
              関連リンク
            </CardTitle>
            <CardDescription>
              プロダクトやSNSなど、フォローアップに必要なリンクをまとめています。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {links.length ? (
              links.map((l) => {
                const linkUrl = createLinkUrl(l.type, l.handle, l.url);

                return (
                  <div
                    key={l.id}
                    className="flex items-center justify-between rounded-lg border border-dashed border-muted-foreground/40 px-3 py-2"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-foreground">
                        {linkLabels[l.type]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {l.handle ?? l.url}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="h-8 border border-transparent text-orange-500 hover:bg-orange-500/10"
                    >
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Link2 className="size-4" />
                        開く
                      </a>
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="rounded-lg border border-dashed border-muted-foreground/40 px-4 py-6 text-center text-sm text-muted-foreground">
                まだリンクが登録されていません。GitHubやプロダクトURLを追加すると便利です。
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-muted bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              アクション
            </CardTitle>
            <CardDescription>
              コンタクトを削除すると復元できません。必要な情報は事前に保存してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DeleteContactForm
              contactId={contactsDetail.id}
              meetupId={meetupId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
