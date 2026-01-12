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

| 領域 | 技術 | version |選定理由 |
| --- | --- | --- |--- |
| 言語 | Typescript | v5 | 型安全による開発速度向上 + bugの発生させにくさのため選定 |
| フルスタックフレームワーク | Next.js <br> App Router | v16 |MVP開発に最適な速度 + UXの高さから選定 |
| UI / スタイリング | shadcn<br>Tailwind CSS v4 | v4 |shadcn: デザインの一貫性のため<br>Tailwind CSS: コンポーネントとデザインを一元管理できるため |
| データアクセス | Prisma v6 | v6 | TSによる型安全 + 実装速度,変更容易性のため選定 |
| バリデーション | Zod  | v4 | RHFとの相性の良さ + schemaの作りやすさ等の学習コストが低いため選定 |
| フォーム | React Hook Form | v7 | zodの相性の良さ，form validation logic自作による車輪の再発明を防ぐため選定 |
| テスト | Vitest  | v3 | Unit, Integrationテストのため選定 |
| コンポーネント開発 | Storybook  | v10 | components単体の確認のため選定 |
| BaaS | Supabase /postgres | - | 設定の少なさによる開発スピード向上,責務移譲のため選定 |
| formatter | husky<br>prettier<br>eslint | v9<br>v3<br>v8| push前にformatterするため<br>品質を高めるため<br>同上 |
| CI/CD |github action | | |

## 起動方法

1. プロジェクトのクローン
```sh
git clone https://github.com/gs223gs/remeet-web.git
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
