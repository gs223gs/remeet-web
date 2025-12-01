import { Building2, UserRound } from "lucide-react";
import Link from "next/link";

import type { MeetupDetailContact } from "@/type/private/meetup/meetup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/util/routes";

type Props = {
  meetupId: string;
  contact: MeetupDetailContact;
};

export const MeetupContactCard = ({ meetupId, contact }: Props) => {
  const hasTags = contact.tags.length > 0;

  return (
    <Card className="border-muted transition hover:-translate-y-0.5 hover:border-orange-200">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {contact.name}
            </CardTitle>
            <CardDescription>{contact.role ?? "役職未登録"}</CardDescription>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
            <UserRound className="size-5" />
          </div>
        </div>
        {contact.company ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4 text-foreground/60" />
            {contact.company}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">所属未登録</p>
        )}
      </CardHeader>
      <CardContent>
        {hasTags ? (
          <div className="flex flex-wrap gap-2">
            {contact.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-dashed border-muted-foreground/40 px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">タグ未登録</p>
        )}
      </CardContent>
      <CardFooter className="border-t border-dashed border-muted-foreground/40 pt-4">
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="w-full border border-muted-foreground/40 text-foreground hover:bg-muted/60"
        >
          <Link
            href={routes.dashboardMeetupContactDetail(meetupId, contact.id)}
          >
            詳細を見る
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
