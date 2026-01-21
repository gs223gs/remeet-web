"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import { createMeetup } from "@/app/(private)/dashboard/meetup/action";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CreateMeetupForm } from "@/components/meetup/form/create-meetup-form";
import {
  meetupClientSchema,
  type MeetupClientSchema,
} from "@/validations/private/meetupValidation";

export default function CreateMeetup() {
  const [_, action, isPending] = useActionState(createMeetup, null);
  const form = useForm<MeetupClientSchema>({
    resolver: zodResolver(meetupClientSchema),
    defaultValues: {
      name: "",
      scheduledAt: new Date(),
    },
    mode: "onChange",
  });

  const isDisabled = !form.formState.isValid || isPending;

  //冗長だが，今後パターンが増えないのであえてこの形にしておく
  //今後パターンが増えた場合迷わずマッピングにした方がいい
  const buttonLabel = isPending
    ? "送信中"
    : form.formState.isValid
      ? "送信"
      : "入力してください";

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <DashboardHeader
        eyebrow="create meetup"
        title="Meetupを作成"
        description="参加したMeetupを登録すると、そこで出会った人の記録を整理できます。"
      />
      <section className="flex flex-col">
        <CreateMeetupForm
          form={form}
          action={action}
          buttonLabel={buttonLabel}
          isDisabled={isDisabled}
        />
      </section>
    </div>
  );
}
