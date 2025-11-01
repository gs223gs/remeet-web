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


## AIからの指摘
 指摘

### 【1.致命的】タグ詳細ページの fetch が Prisma で失敗いたします。
  事実: app/(private)/dashboard/tags/[tagId]/_server/server.ts:27 では findUnique の where に id と userId を同時指定しております; prisma/schema.prisma:166-178 では id 単体と (userId, name) の複合ユニークしか定義がございません。
  予測: Prisma の findUnique は余分なフィールドを受け付けないため Unknown arg エラーとなり、/dashboard/tags/[tagId] へのアクセスが常に 500 になると考えております。

A. 仕様上問題ない
### 【2.将来的にパフォーマンスが落ちる】/dashboard/contacts が全件と関連データを一括取得しております。
  事実: app/(private)/dashboard/contacts/_server/server.ts:23-61 で全 Contact と Links/Tags/Meetups をまとめて取得しています。
  予測: コンタクト数が増えるとレスポンスが線形に肥大化し、SSR の応答遅延やメモリ消費が顕著になると想定しております。

A. リリース後，パフォーマンスの懸念が見えたらpaginationに変更
### 【2.将来的にパフォーマンスが落ちる】ダッシュボードサマリーで最新ミートアップ参加者を全件取得しております。
  事実: app/(private)/dashboard/_server/server.ts:25-47 では最新ミートアップに紐づく全参加者を制限なく返しています。
  予測: 大規模イベントを登録した場合にトップページ表示だけで大量データを捌く必要が生じ、初期表示が重くなると考えております。

A. リリース後，パフォーマンスの懸念が見えたらpaginationに変更
### 【3.有識者が見たら首を傾げる】Contact を「1 ミートアップ専用」とみなす実装になっております。
  事実: app/(private)/dashboard/contacts/_server/server.ts:67-95 で const [first] = c.meetups として単一 MeetUp を前提にし、prisma/schema.prisma:145-163 では contact と meetup を多対多で許容しております。
  予測: 将来 Contact を複数 MeetUp で共有したい場合に表示崩れや undefined 参照クラッシュが発生する恐れがございます。

A. 仕様通り. 現在の使用では1contactは1meetupに参加 別meetupに同一contactが参加した場合は登録しない ~~or 同一登録 ~~にする使用(MVP時点では)

### 【4.ちょっと気になる】getUser が毎回 Prisma へ問い合わせております。
  事実: auth.ts:12-23 でセッション取得後に user を DB から再取得しており、多くの server function で都度呼び出しています。
  予測: 現状の規模では問題ないものの、同一リクエスト内で複数回呼ばれる構成になると余計な往復が積み重なり、レイテンシの微増要因になる可能性がございます。

A. 個人情報になりうるものを扱うので，毎回DBへの存在確認をする予定であった．パフォーマンスの懸念が見えたら変更する(MVP時点ではこのまま)

### 次のアクション候補

  1. /dashboard/tags/[tagId] を findFirst などに改めて userId 条件を適切に掛け直し、即時に 500 エラーを止めることをご検討ください。
  2. /dashboard/contacts と ダッシュボードサマリーにページングや件数上限（例: 直近 5 件）を導入し、将来のデータ増加に備えることをおすすめいたします。
  3. Contact と Meetup の関係性を仕様としてどちらに寄せるか明確化し、必要であればスキーマや UI の前提を再設計なさると安心です。
