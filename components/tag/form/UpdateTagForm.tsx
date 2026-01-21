"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import type { Tag } from "@/type/private/tags/tags";

import { updateTag } from "@/app/(private)/dashboard/tags/[tagId]/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
  const [_, action, isPending] = useActionState(updateTagWithId, null);

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: tag.name,
    },
    mode: "onChange",
  });

  const isDisabled = !form.formState.isValid || isPending;
  const buttonLabel = isPending
    ? "更新中..."
    : form.formState.isValid
      ? "変更を保存"
      : "入力してください";

  return (
    <Form {...form}>
      <form action={action} className="space-y-4">
        <Card className="shadow-sm">
          <CardContent className="space-y-6 m-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base">
                    タグ名
                    <span className="text-xs text-orange-500">必須</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={20}
                      placeholder="例: Product Hunters"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={isDisabled}
              className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
            >
              {buttonLabel}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
