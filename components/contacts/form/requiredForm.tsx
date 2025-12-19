"use client";
type Props = {
  meetupId: string;
  tags: Tag[];
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";

import type { Tag } from "@/type/private/tags/tags";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

import { createContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { NewTag } from "@/components/tag/form/newTag";
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
import { createContactsFrontSchema } from "@/validations/private/contactsValidation";

export default function RequiredForm({ meetupId, tags }: Props) {
  const createContactsWithMeetupId = createContacts.bind(null, meetupId);
  const [initialTags, setInitialTags] = useState<Tag[]>([...tags]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>("");

  const [state, action, isPending] = useActionState(
    createContactsWithMeetupId,
    {
      success: false,
      errors: {},
    },
  );

  const form = useForm<CreateContactsSchema>({
    resolver: zodResolver(createContactsFrontSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      description: "",
      tags: [],
      twitterHandle: "",
      twitterId: "",
      websiteHandle: "",
      websiteUrl: "",
      githubHandle: "",
      githubId: "",
      productHandle: "",
      productUrl: "",
      otherHandle: "",
      other: "",
    },
    //Actionとの併用のためfocus が外れたらエラーを出す
    mode: "onChange",
  });

  if (isPending) return <div>pending</div>;

  return (
    <Form {...form}>
      <p>{state.errors.server}</p>
      <p>{state.errors.auth}</p>
      <form action={action} className="flex flex-col m-4 outline">
        <p className=" bg-amber-200">*必須</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder="T.Miura" {...field} />
              </FormControl>
              <FormDescription>出会った人の名前を入力</FormDescription>
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
                <Input placeholder="TMiura.inc" {...field} />
              </FormControl>
              <FormDescription>所属企業を入力</FormDescription>
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
                  placeholder="個人開発者, VPoE, テックリード"
                  {...field}
                />
              </FormControl>
              <FormDescription>役職を入力</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>詳細</FormLabel>
              <FormControl>
                <Input placeholder="話したことを書きましょう!" {...field} />
              </FormControl>
              <FormDescription>マークダウンで書けます</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* form送信のためのinput */}
        {form.getValues().tags?.map((s) => {
          return <input key={s} type="hidden" name="tags" value={s} />;
        })}
        {/* tagが五つ以上入れれるバグがあるからなおす */}
        <NewTag
          newTag={newTag}
          setNewTag={setNewTag}
          setSelectTags={setSelectTags}
          selectTags={selectTags}
        />
        {}
        {/* タグ解除 */}
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>tag</FormLabel>
              <FormControl></FormControl>
              {selectTags.map((t) => {
                return (
                  /**
                   * TODO コンポーネントを分ける tagItem.tsx? 命名は適切に作ってください
                   * constTagItem = ({tag:Tag, children}){
                   *  return (
                   *  <div>
                   *  tagの内容
                   *  onClick
                   * children
                   *  </div>
                   * )
                   * }
                   *
                   */
                  <div key={t.id} className="outline flex">
                    <span>{t.name}</span>
                    <button
                      onClick={() => {
                        const filteredTag = selectTags.filter((st) => st != t);

                        // RHF にセット
                        form.setValue(
                          "tags",
                          filteredTag.map((ft) => {
                            return ft.id;
                          }),
                          { shouldValidate: true },
                        );
                        console.log(form.getValues().tags);
                        setSelectTags([...filteredTag]);
                        setInitialTags([t, ...initialTags]);
                      }}
                      className=" outline"
                      type="button"
                    >
                      x
                    </button>
                  </div>
                );
              })}
              <FormDescription>5つまでタグをつけれます</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* タグ選択 クリックでタグを選択*/}
        <div className="outline m-5">
          {initialTags.map((t) => {
            return (
              <div
                className="outline"
                key={t.id}
                onClick={() => {
                  if (selectTags.length === 5) {
                    {
                      /** error どうしようね */
                    }
                    return;
                  }

                  const selectedFormTag = [
                    ...selectTags,
                    { id: t.id, name: t.name },
                  ];

                  form.setValue(
                    "tags",
                    selectedFormTag.map((st) => {
                      return st.id;
                    }),
                    { shouldValidate: true },
                  );
                  console.log(form.getValues().tags);

                  setSelectTags([...selectTags, t]);
                  const filterContactsTags = initialTags.filter(
                    (c) => t.id != c.id,
                  );
                  setInitialTags([...filterContactsTags]);
                }}
              >
                {t.name}
              </div>
            );
          })}
        </div>
        <FormField
          control={form.control}
          name="githubHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GithubHandle</FormLabel>
              <FormControl>
                <Input placeholder="githubの名前を入力" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="githubId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GithubId</FormLabel>
              <FormControl>
                <Input placeholder="GitHubのidを入力" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ハンドルネーム</FormLabel>
              <FormControl>
                <Input placeholder="GitHubのidを入力" {...field} />
              </FormControl>
              <FormDescription>誰がなと言おうとTwitter</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TwitterId</FormLabel>
              <FormControl>
                <Input placeholder="GitHubのidを入力" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>website</FormLabel>
              <FormControl>
                <Input placeholder="プロフィールサイト名" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://...." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>個人開発サービス</FormLabel>
              <FormControl>
                <Input placeholder="ReMeet" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://...." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otherHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他</FormLabel>
              <FormControl>
                <Input placeholder="https://...." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他のURL</FormLabel>
              <FormControl>
                <Input placeholder="https://...." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">送信</button>
      </form>
    </Form>
  );
}
