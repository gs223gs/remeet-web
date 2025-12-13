import Link from "next/link";
import type { Meta, StoryObj } from "@storybook/react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import {
  LatestMeetupCard,
  type LatestMeetupData,
} from "@/components/dashboard/latest-meetup-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardSummaryState =
  | {
      ok: true;
      data: {
        meetupCount: number;
        thisYearContactCount: number;
        lastMeetupContacts: {
          meetupId: string;
          meetupName: string;
          meetupScheduledAt: Date;
          contactId: string;
          contactName: string;
        }[];
      };
    }
  | {
      ok: false;
      error?: { message?: string[] };
    };

type DashboardPagePreviewProps = {
  summary: DashboardSummaryState;
};

function DashboardPagePreview({ summary }: DashboardPagePreviewProps) {
  if (!summary.ok) {
    const message =
      summary.error?.message?.join(" / ") ?? "再度読み込みをお試しください。";

    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>情報取得に失敗しました</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-500/90"
            >
              <Link href="/dashboard">リロード</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const { meetupCount, thisYearContactCount, lastMeetupContacts } =
    summary.data;

  const latestMeetup: LatestMeetupData | null = lastMeetupContacts.length
    ? {
        meetupId: lastMeetupContacts[0].meetupId,
        name: lastMeetupContacts[0].meetupName,
        scheduledAt: lastMeetupContacts[0].meetupScheduledAt,
        contacts: lastMeetupContacts.map((contact) => ({
          id: contact.contactId,
          name: contact.contactName,
        })),
      }
    : null;

  const latestMeetupSummary = latestMeetup
    ? { name: latestMeetup.name, scheduledAt: latestMeetup.scheduledAt }
    : null;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <DashboardHeader
        eyebrow="meetup overview"
        title="ダッシュボード"
        description="直近のMeetupとコンタクト状況をここで素早く確認しましょう。"
      />
      <section className="flex flex-col gap-6">
        <DashboardStats
          meetupCount={meetupCount}
          thisYearContactCount={thisYearContactCount}
          latestMeetup={latestMeetupSummary}
        />
        <LatestMeetupCard latestMeetup={latestMeetup} />
      </section>
    </div>
  );
}

const defaultSummary: DashboardSummaryState = {
  ok: true,
  data: {
    meetupCount: 18,
    thisYearContactCount: 64,
    lastMeetupContacts: [
      {
        meetupId: "meetup-2024-08",
        meetupName: "Tokyo Builders Meetup #12",
        meetupScheduledAt: new Date("2024-08-10T11:00:00+09:00"),
        contactId: "contact-1",
        contactName: "山田 太郎",
      },
      {
        meetupId: "meetup-2024-08",
        meetupName: "Tokyo Builders Meetup #12",
        meetupScheduledAt: new Date("2024-08-10T11:00:00+09:00"),
        contactId: "contact-2",
        contactName: "佐藤 花子",
      },
    ],
  },
};

const emptySummary: DashboardSummaryState = {
  ok: true,
  data: {
    meetupCount: 0,
    thisYearContactCount: 0,
    lastMeetupContacts: [],
  },
};

const errorSummary: DashboardSummaryState = {
  ok: false,
  error: {
    message: ["情報取得に失敗しました", "ネットワークを確認してください"],
  },
};

const meta = {
  title: "Dashboard/DashboardPage",
  component: DashboardPagePreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    summary: defaultSummary,
  },
} satisfies Meta<typeof DashboardPagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: {
    summary: emptySummary,
  },
};

export const ErrorState: Story = {
  args: {
    summary: errorSummary,
  },
};
