"use client";
type Props = {
  meetupId: string;
  tags: Tag[];
};

import { useActionState, useState } from "react";

import type { Tag } from "@/type/private/tags/tags";

import { createContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { NewTag } from "@/components/tag/form/newTag";
import { Form } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function RequiredForm({ meetupId, tags }: Props) {
  const createContactsWithMeetupId = createContacts.bind(null, meetupId);
  const [contactTags, setContactTags] = useState<Tag[]>([...tags]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [state, action, isPending] = useActionState(
    createContactsWithMeetupId,
    {
      success: false,
      errors: {},
    },
  );

  if (isPending) return <div>pending</div>;

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col m-4 outline">
        <p className="">*必須</p>
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
        <NewTag
          newTag={newTag}
          setNewTag={setNewTag}
          setSelectTags={setSelectTags}
          selectTags={selectTags}
        />
        <div className="outline m-5">
          {contactTags.map((t) => {
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
                  setSelectTags([...selectTags, t]);
                  const filterContactsTags = contactTags.filter(
                    (c) => t.id != c.id,
                  );
                  setContactTags([...filterContactsTags]);
                }}
              >
                {t.name}
              </div>
            );
          })}
        </div>
        <div className="outline m-5">
          {/*TODO あとでセレクトボックスにする */}
          {selectTags.map((t) => {
            return (
              <div key={t.id} className="outline flex">
                <input defaultValue={t.id} name="tags" type="hidden" />
                <span>{t.name}</span>
                <button
                  onClick={() => {
                    setSelectTags([...selectTags.filter((st) => st != t)]);
                  }}
                  className=" outline"
                  type="button"
                >
                  x
                </button>
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
          name="githubId"
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
              <FormLabel>TwitterId</FormLabel>
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
