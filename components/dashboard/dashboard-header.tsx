import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/color-mode-toggle";

type DashboardHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function DashboardHeader({
  eyebrow,
  title,
  description,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ModeToggle />
        <Button
          asChild
          variant="ghost"
          className="border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-50"
        >
          <Link href="/dashboard/meetup">Meetup一覧</Link>
        </Button>
        <Button
          asChild
          className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
        >
          <Link href="/dashboard/meetup/new">Meetupを作成</Link>
        </Button>
      </div>
    </div>
  );
}
