## はじめに
このmarkdownはpageごとのデータ取得方をまとめたものです.

## 目的
MVPといえどある程度パフォーマンスを意識するために調査します
## lib
### getUser
```ts
export const getUser = async () => {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });

  if (!user) return null;

  return user;
};
```
## 調査結果
### /
### OK: /dashboard
#### server function
- getUserでユーザー検証
- meetup数をカウント
- 最新meetupのcontacts取得
- 今年会った人数をカウント
上記をPromise.allでまとめてやる

getUserでの検証

#### server action
なし

### OK: /dashboard/contacts

#### server function
- contacts全て表示
  - meetup + tag も 1回のprismaで表示

Linkクリックでの遷移先: /dashboard/meetup/[meetupId]/contacts/[contactsId]
getUserでの検証
#### server action

### OK: /dashboard/meetup

#### server function
getUserでの検証

全てのmeetupを取得


#### server action

### OK: /dashboard/meetup/new
#### server function
#### server action
getUser
createでmeetupをinsert


### OK: /dashboard/meetup/[meetupId]
#### server function
getUserでの認証

prismaでのミートアップ情報の取得とcontactsを一回で取得
contactのLinkクリックで
/dashboard/meetup/[meetupId]/contacts/[contactsId]
に遷移
#### server action

### OK: /dashboard/meetup/[meetupId]/edit

Propsで渡すのこれ忘れてた

これをコンポーネントでfunction走らせて取得にするか
Propsにするか
#### server function
#### server action
getUser
prismaでのupdate

### OK: /dashboard/meetup/[meetupId]/contacts/[contactsId]
#### server function
getUser
contactの詳細な情報を取得

#### server action

### OK: /dashboard/meetup/[meetupId]/contacts/new
#### server function
form親コンポーネントでユーザーの全てのタグ取得
getUser


#### server action
子formコンポーネント
にPropsでmeetupIdとtagsを渡す
getUser
##### 新規contact submit
1. meetupの存在確認
1. tagの存在確認
1. トランザクション{
contact(contact作成)
contactsMeetup(中間テーブル)
if(linkが一つでもあったら)contactsLink(中間テーブル)
if(tagが一つでもあったら)contactsTag(中間テーブル)
}

##### formで新規タグを入力 submit
getUser
tag create



### OK: /dashboard/tags
#### server function
getUser

全てのタグを取得
タグClickで
/dashboard/tags/[tagId]
に遷移

#### server action

### OK: /dashboard/tags/[tagId]
paramsでtagIdを受け取る

#### server function
getUser
prisma.tag.findUniqueでタグに基づく全てのcontactsを取得
#### server action

### /login
auth.js でのOAuth これは必須
