## ReMeet UIデザインガイド（Dashboard基準）

ダッシュボード実装で作成したコンポーネントのトーン&スタイルを他画面でも再利用するためのメモです。レイアウト単位での余白や配色、shadcnコンポーネントの使い方をまとめています。

### 1. 共通レイアウト
- ルート：`<div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">` をベースに、ページ全体の余白は `sm: 24px`, `lg: 40px`。
- セクション分割は `gap-6` を基準値にし、カードやグリッドは `lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,1fr)]` のように主コンテンツ重視の比率。
- 見出しブロックは `DashboardHeader` を使用

### 2. タイポグラフィ
- Eyebrow：`text-xs font-semibold uppercase tracking-wide text-orange-500`
- 見出し：`text-2xl font-semibold tracking-tight`（レスポンシブで `sm:text-3xl`）
- 本文：`text-sm text-muted-foreground` をデフォルト。カード内の主要値は `text-3xl font-bold`、補足は `text-xs`。
- 数値や日付は `/util/dateFormatter.ts` を使用し、必ずロケールを固定して表記ゆれを防止。

### 3. カラー&アクセント
- 背景：全体背景なし
- ブランドカラー：CTAは `bg-orange-500 text-white hover:bg-orange-500/90`。副次ボタンは `variant="ghost"` に `border-blue-200 bg-blue-50` を重ねてフレンドリーな青系アクセント。
- ステータスアイコンのバッジは `bg-***-500/10 text-***-600` とし、Orange/Blue/Emeraldをローテーション。

### 4. コンポーネントパターン
| コンポーネント | 用途/書き方 | 注意点 |
| --- | --- | --- |
| `DashboardHeader` | ページ上部の情報セット | CTAボタンは `ModeToggle` + ゴーストボタン + プライマリーボタンの順で配置 |
| `DashboardStats` | 3分割カードグリッド | `CardHeader` で `flex flex-row items-start justify-between`、右上にラウンドアイコン |
| `LatestMeetupCard` | 詳細プレビューカード | データ無し時は `border-dashed` の空状態、`CardFooter` にコピー＋CTA |
| 新規カード | `Card` + `CardHeader/Content/Footer` で階層化 | アイテムリストは `rounded-lg border border-dashed` を使うと統一感が出る |

### 5. ボタン&リンク
- CTA：`<Button className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90">`
- サブCTA：`variant="ghost"` + `border` を付与し、テキストリンクは `Link` に `asChild` を渡す。
- カード内アクションはサイズ `size="sm"` をデフォルトにして余白過多を避ける。

### 6. アイコン・装飾
- Lucide を使用。`size-5` 程度で丸ベースのバッジ (`rounded-full`) に収める。
- 視覚的セクション区切りには `rounded-xl bg-muted/40 px-4 py-3` を用い、情報ラベル（text-sm, text-muted-foreground）と値（text-lg font-semibold）を縦並びにする。

### 7. 状態パターン
- ローデータ無しの場合は「まだ〜がありません。〇〇しましょう。」と促すメッセージ＋`border-dashed` の空コンテナ。
- エラー時は中央揃えカードで `CardTitle` + `CardDescription` + 再試行ボタン。
- 補助テキストは `text-xs text-muted-foreground` で統一し、過剰な色数を避ける。

### 8. レイアウトバリエーション
- 2カラム：`grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,1fr)]`。フォーム＋サマリーやリスト＋詳細に流用可。
- 単カラム：`space-y-6` とし、それぞれのカードに `max-w-2xl` など幅制御を入れると読みやすい。
- 情報リスト：`flex items-center justify-between rounded-lg border border-dashed ...` を用いて行単位の情報を視覚的に区切る。

### 9. Do / Don't
- Do: shadcnコンポーネントを優先し、独自div構成に走らない。
- Do: 色はオレンジ（プライマリ）＋青（セカンダリ）＋エメラルド（サクセス）で統一。
- Do: 余白・角丸は `rounded-lg` `rounded-xl` を使い分け、過度なシャドウは避ける。
- Do: `.map()`と`.filter()`使用時はmap|filter する変数名の一文字 or 短縮にする 例 `contact.map((c)=>{})`
- Don't: IDなど内部情報の表示や、カード内に長い段落を並べること。
- Don't: アイコンや色を増やし過ぎて情報のヒエラルキーを崩すこと。

### 10. 実装Tips
1. shadcnに同等コンポーネントがないかMCPで必ず検索 → 既存を流用してカスタムを最小化
2. レイアウトコンテナの余白 (`px-4 py-6` etc.) はまず既存値をコピーペーストし、必要ならブレークポイントだけ調整
3. 日付は `Intl` フォーマッタを共通化して再利用
4. 数字はフォーマットしないこと
5. Linkは`/util/routes.ts`を使用すること
6. 一つのファイルにコンポーネントは一つまで，それ以外は分割すること
1. コンポーネントのファイル名はパスカルケースにすること
1. コンポーネントはアロー関数で作成すること