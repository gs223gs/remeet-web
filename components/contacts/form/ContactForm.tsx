"use client";
import { useState } from "react";

import type { Tag } from "@/type/private/tags/tags";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";
import type { UseFormReturn } from "react-hook-form";

import { GithubLinkFields } from "@/components/contacts/form/link/GithubLinkFields";
import { OtherLinkFields } from "@/components/contacts/form/link/OtherLinkFields";
import { ProductLinkFields } from "@/components/contacts/form/link/ProductLinkFields";
import { TwitterLinkFields } from "@/components/contacts/form/link/TwitterLinkFields";
import { WebsiteLinkFields } from "@/components/contacts/form/link/WebsiteLinkFields";
import { ScrollTagSelector } from "@/components/tag/display/ScrollTagSelector";
import { SelectedTags } from "@/components/tag/display/SelectedTags";
import { CreateTagForm } from "@/components/tag/form/CreateTagForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";

type Props = {
  tags: Tag[];
  form: UseFormReturn<CreateContactsSchema>;
  action: (payload: FormData) => void;
  buttonLabel: string;
  isDisabled: boolean;
  isOpenLinkFields?: boolean;
};
const TAG_LIMIT = 5;

export const ContactForm = ({
  tags,
  form,
  action,
  isDisabled,
  buttonLabel,
  isOpenLinkFields = false,
}: Props) => {
  const [userTags, setUserTags] = useState<Tag[]>([...tags]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const [isUseLinkFields, setIsUseLinkFields] = useState(isOpenLinkFields);

  const onTagSelect = (t: Tag) => {
    if (selectTags.length === TAG_LIMIT) {
      return;
    }

    const selectedFormTag = [...selectTags, { id: t.id, name: t.name }];

    form.setValue(
      "tags",
      selectedFormTag.map((st) => {
        return st.id;
      }),
      { shouldValidate: true },
    );
    setSelectTags([...selectTags, t]);
    const filteredContactsTags = userTags.filter((c) => t.id !== c.id);
    setUserTags([...filteredContactsTags]);
    setTagQuery("");
  };
  const onTagDeselect = (t: Tag) => {
    const deselectedTag = selectTags.filter((st) => st.id !== t.id);

    form.setValue(
      "tags",
      deselectedTag.map((dt) => {
        return dt.id;
      }),
      { shouldValidate: true },
    );
    setSelectTags([...deselectedTag]);
    setUserTags([t, ...userTags]);
  };

  return (
    <Form {...form}>
      <form action={action} className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>基本情報</CardTitle>
            <CardDescription>
              出会った相手のプロフィールや会話の背景を簡潔にまとめましょう。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="flex items-center gap-2 text-base">
                    名前 <span className="text-xs text-orange-500">必須</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="例: T. Miura" {...field} />
                  </FormControl>
                  <FormDescription>
                    名札やプロフィールに記載された名前を入力します。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所属企業</FormLabel>
                  <FormControl>
                    <Input placeholder="例: TMiura Inc." {...field} />
                  </FormControl>
                  <FormDescription>
                    所属している企業やコミュニティ名を入力します。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>役職</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例: 個人開発者 / VPoE / テックリード"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    聞き出せた肩書きを記録します。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>会話メモ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="どんな話をしたか、相手の興味や課題感などをメモとして残しておきましょう。"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    今後のリリースで markdown に対応します
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          {/* server 用に hidden でおいておく */}
          {form.watch("tags")?.map((tagId) => (
            <input key={tagId} type="hidden" name="tags" value={tagId} />
          ))}

          <CardHeader className="flex flex-row items-center gap-3 pb-4">
            <div>
              <CardTitle>タグを選択</CardTitle>
              <span className="text-xs text-muted-foreground">
                {selectTags.length}/{TAG_LIMIT}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <div className="flex items-center justify-between"></div>
                  <CreateTagForm
                    tagQuery={tagQuery}
                    setTagQuery={setTagQuery}
                    setSelectTags={setSelectTags}
                    selectTags={selectTags}
                    form={form}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectedTags
              selectedTags={selectTags}
              onTagDeselect={onTagDeselect}
            />
            <ScrollTagSelector
              userTags={userTags}
              tagQuery={tagQuery}
              onTagSelect={onTagSelect}
            />
          </CardContent>

          <CardContent>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={isUseLinkFields}
                  onCheckedChange={() => setIsUseLinkFields((prev) => !prev)}
                />
                リンク・SNS を入力する
              </label>
            </div>
          </CardContent>

          {isUseLinkFields && (
            <>
              <CardHeader className="pb-4">
                <CardTitle>リンク・SNS</CardTitle>
                <CardDescription>
                  交換したSNSやプロダクトの情報があれば入力してください。スキップ可能です。
                  名前を入れた場合はIDも入れてください
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <GithubLinkFields formControl={form.control} />
                <TwitterLinkFields formControl={form.control} />
                <WebsiteLinkFields formControl={form.control} />
                <ProductLinkFields formControl={form.control} />
                <OtherLinkFields formControl={form.control} />
              </CardContent>
            </>
          )}
        </Card>
        <Button
          type="submit"
          disabled={isDisabled}
          className="w-full bg-orange-500 text-white shadow-sm hover:bg-orange-500/90 "
        >
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
};
