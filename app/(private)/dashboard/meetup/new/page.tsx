"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import { createMeetup } from "@/app/(private)/dashboard/meetup/action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  meetupClientSchema,
  type MeetupClientSchema,
} from "@/validations/private/meetupValidation";

export default function CreateMeetup() {
  const [state, action, isPending] = useActionState(createMeetup, {
    success: false,
    errors: {},
  });
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
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ミートアップ名</FormLabel>
              <FormControl>
                <Input placeholder="ミートアップ名" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scheduledAt"
          render={({ field }) => (
            <FormItem>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
              />
              <FormLabel>ミートアップの日付</FormLabel>

              <FormControl>
                <input
                  type="hidden"
                  name="scheduledAt"
                  value={new Date(field.value).toISOString()}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
              {state.errors.scheduledAt}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisabled}>
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
}
