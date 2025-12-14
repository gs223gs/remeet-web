import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CreateMeetupForm } from "@/components/meetup/form/create-meetup-form";
import { ServerErrorCard } from "@/components/util/server-error-card";
import {
  meetupClientSchema,
  type MeetupClientSchema,
} from "@/validations/private/meetupValidation";

type CreateMeetupPagePreviewProps = {
  showServerError: boolean;
  isPending: boolean;
};

function CreateMeetupPagePreview({
  showServerError,
  isPending,
}: CreateMeetupPagePreviewProps) {
  const form = useForm<MeetupClientSchema>({
    resolver: zodResolver(meetupClientSchema),
    defaultValues: {
      name: "",
      scheduledAt: new Date(),
    },
    mode: "onChange",
  });

  const buttonLabel = isPending
    ? "送信中"
    : form.formState.isValid
      ? "送信"
      : "入力してください";

  const isDisabled = !form.formState.isValid || isPending;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <DashboardHeader
        eyebrow="create meetup"
        title="Meetupを作成"
        description="参加したMeetupを登録すると、そこで出会った人の記録を整理できます。"
      />
      <section className="flex flex-col">
        {showServerError && <ServerErrorCard />}
        <CreateMeetupForm
          form={form}
          action={async (formData) => {
            const entries = Object.fromEntries(formData.entries());
            console.log(entries);
          }}
          buttonLabel={buttonLabel}
          isDisabled={isDisabled}
        />
      </section>
    </div>
  );
}

const meta = {
  title: "Meetup/CreateMeetupPage",
  component: CreateMeetupPagePreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    showServerError: false,
    isPending: false,
  },
  argTypes: {
    showServerError: {
      control: "boolean",
    },
    isPending: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CreateMeetupPagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pending: Story = {
  args: {
    isPending: true,
  },
};

export const ServerError: Story = {
  args: {
    showServerError: true,
  },
};
