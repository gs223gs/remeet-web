"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import type { Tag } from "@/type/private/tags/tags";

import { updateTag } from "@/app/(private)/dashboard/tags/[tagId]/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  tagSchema,
  type TagSchema,
} from "@/validations/private/tagValidations";

type UpdateTagFormProps = {
  tag: Tag;
};
export const UpdateTagForm = ({ tag }: UpdateTagFormProps) => {
  const updateTagWithId = updateTag.bind(null, tag.id);
  //TODO state を潰している(action側が未整備のため MVPでのrelease後 refactoring を行ったらupdateする)
  const [_, action, isPending] = useActionState(updateTagWithId, {
    success: false,
    errors: {},
  });

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: tag.name,
    },
    mode: "onChange",
  });
  const isDisabled = !form.formState.isValid || isPending;
  const buttonLabel = isPending
    ? "送信中"
    : form.formState.isValid
      ? "送信"
      : "入力してください";
  if (isPending) {
    return <div>pending</div>;
  }
  return (
    <Form {...form}>
      <form action={action}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>tag名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisabled}>
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
};
