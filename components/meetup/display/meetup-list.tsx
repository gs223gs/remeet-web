import type { MeetupSummary } from "@/type/private/meetup/meetup";

import { MeetupCard } from "@/components/meetup/display/meetup-card";
import { MeetupEmptyState } from "@/components/meetup/display/meetup-empty-state";

export function MeetupList({ meetups }: { meetups: MeetupSummary[] }) {
  if (!meetups.length) {
    return <MeetupEmptyState />;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-foreground">全{meetups.length}件</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {meetups.map((m) => (
          <MeetupCard
            key={m.meetup.id}
            meetup={m.meetup}
            contactsCount={m.contactsCount}
          />
        ))}
      </div>
    </section>
  );
}
