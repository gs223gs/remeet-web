import { Building2, CalendarDays, Link2, Tags, UserRound } from "lucide-react";
import Link from "next/link";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { MeetupDetail } from "@/type/private/meetup/meetup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { linkLabels, createLinkUrl } from "@/util/contactLinkFormatter";
import { dateFormatter } from "@/util/dateFormatter";
import { routes } from "@/util/routes";

type ContactWithMeetup = ContactsDetailDTO & { meetup: MeetupDetail };

type Props = {
  contact: ContactWithMeetup;
};

export const ContactCard = ({ contact }: Props) => {
  return (
    <Card className="flex h-full flex-col border-muted transition hover:-translate-y-0.5 hover:border-orange-200">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">
              {contact.name}
            </CardTitle>
            <CardDescription>{contact.role ?? "役職未登録"}</CardDescription>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <UserRound className="size-5" />
          </div>
        </div>
        <div className="rounded-xl bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Building2 className="size-4" />
            Company
          </div>
          <p className="text-sm font-medium text-foreground">
            {contact.company ?? "所属未登録"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 text-sm">
        <div className="rounded-xl bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-orange-500">
            <CalendarDays className="size-4" />
            Meetup
          </div>
          <p className="text-lg font-semibold text-foreground">
            {contact.meetup.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {dateFormatter(contact.meetup.scheduledAt)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Link2 className="size-4" />
            Links
          </div>
          {contact.links && contact.links.length ? (
            <div className="space-y-2">
              {contact.links.map((l) => {
                const linkUrl = createLinkUrl(l.type, l.url);

                return (
                  <div
                    key={l.id}
                    className="flex items-center justify-between rounded-lg border border-dashed border-muted-foreground/40 px-3 py-2"
                  >
                    <div>
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
                      <a href={linkUrl}>開く</a>
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">リンク未登録</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Tags className="size-4" />
            Tags
          </div>
          {contact.tags && contact.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full border border-dashed border-muted-foreground/40 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {t.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">タグ未登録</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t border-dashed border-muted-foreground/40 pt-4">
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="w-full border border-muted-foreground/40 text-foreground hover:bg-muted/60"
        >
          <Link
            href={routes.dashboardMeetupContactDetail(
              contact.meetup.id,
              contact.id,
            )}
          >
            詳細を見る
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
