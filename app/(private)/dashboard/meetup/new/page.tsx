"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import { createMeetup } from "@/app/(private)/dashboard/meetup/action";
import { Button } from "@/components/ui/button";
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

  const today = new Date().toISOString().slice(0, 10);
  const form = useForm<MeetupClientSchema>({
    resolver: zodResolver(meetupClientSchema),
    defaultValues: {
      name: "",
      scheduledAt: today,
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
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel></FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
