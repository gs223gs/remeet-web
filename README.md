# remeet-web

出会った人を記録するアプリ

## 目的
あなたはミートアップで出会った人を翌日になっても覚えていますか？
重要なcontextを無くしてはいないですか？
名前，連絡先，会社，そのほかにも得意なこと，領域も聞いたはずですがしっかり覚えていますか？
名刺をいただいた後にその人を思い出せますか？

意識の高いエンジニアならば自ずとミートアップの参加も増えたくさんの交流が増えるはずです．
しかし，人間の脳はすぐに揮発し，重要な情報にもかかわらずGCによるメモリ解放をしてしまいます

これらの重要な情報を外にだし，忘れない
これが目的のアプリになります

## 技術スタック

- Next.js App Router
- shadcn, tailwind
- Prisma
- Zod 
- RHF
- Vitest
- storybook
- supabase

## 起動方法

1. プロジェクトのクローン
```sh
git clone ...
```
2. プロジェクトに移動
```sh
cd remet-web
```
3. server 起動
```sh
npm run dev
```
4. ブラウザでアクセス
```sh
http://localhost:3000/
```

# 以下現状と今後について
## AI について
基本的な実装はAIではなく私が行っている
(学習の一環 + 自分の実力を示すため)

## logについて
logはrepositoryの二つのlayer で出力する
現場致命的なのはrepository のみのため

## refactoringについて

### repository, service, server actionが返すものについて
現在は関数呼び出し後のreturnする値がかなりブレている

#### repository の return について
repository が返すerror は UIについて関係ないものとする
エラーコードを返す

責務: DBの結果を返す
#### service の return について
actionにはエラーコードとdetailを返す

責務: actionでの判断基準のため,repositoryの結果 + 追加情報
#### server action の return について
service から渡ってきたエラーコードに基づいてUIで表示する文字をreturn する

責務: UI表示のため


### server action
責務を持ち過ぎていたのでリファクタリングしている

特に，prismaを直接使用するのではなくRepository layerに閉じるように変更する

```ts
const result = xxxRepository.CRUD()
if(!result.ok)
  return{
    //
  }
```
### コンポーネント命名
ぶれていたので現在PascalCase に統一する作業をしている

## test について
importが解決できない(@によるaliasが効かない/errorになる)ため，テストが書けていない．
原因としてはVitestの設定にあると考えている．

MVPとしてリリース後テストを書いていく．

### 行うテストについて
テストのピラミッドを意識して unit test の比率を大きく e2e をすくなく行っていく
特にprisma周りは壊れやすい，壊れたら致命的なので熱くかきたいと考えている
#### unit test
validation, dateformatの軽いテストを書く予定

#### integration test
Repository layerのテストを書く予定
dockerでpostgresqlのコンテナを立てて実DBによるテストにする

#### e2e
playrightを使用してe2eテストを行う

### 学んだこと
ありがたいことにたまにreviewしていただいている
reviewで学んだこと，自分でたどり着いたことを書いている

#### Server Action の責務について
[zenn 記事](https://zenn.dev/gs223gs/articles/89c0ec0b93a071)

#### Repository Layer について

#### Result type について
