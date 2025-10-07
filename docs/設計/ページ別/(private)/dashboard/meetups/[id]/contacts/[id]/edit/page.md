# タイトル: 出会った人編集（/dashboard/meetups/[id]/contacts/[id]/edit）

## 目的 / Purpose
- 既存コンタクトの編集

## URL / ルーティング
- パス: `/dashboard/meetups/[id]/contacts/[id]/edit`
- 動的パラメータ:
  - `[id]: string`（先頭: Meetup ID）
  - `[id]: string`（後段: Contact ID）
  - 衝突を避けるため実装上は `[meetupId]` / `[contactId]` の命名を推奨
- クエリ: なし

## アクセス制御 / Auth
- 認証必須

## コンテンツ / 情報設計
- 入力項目: 氏名/所属/メモ/タグ 等 [TODO]

## UI / UX
- 既存値ロード/未存在時の扱い [TODO]

## 入力 / 検証
- zod 等での検証 [TODO]

## 振る舞い / イベント
- 保存成功時: 一覧へ戻る/トースト [TODO]

## データ依存 / API
- GET `/api/meetups/[meetupId]/contacts/[contactId]`
- PUT `/api/meetups/[meetupId]/contacts/[contactId]`

## エラーハンドリング
- 404/409 等 [TODO]

## アクセシビリティ
- [TODO]

## テスト観点
- 取得失敗/更新成功

## 未決事項 / メモ
- ルートパラメータの命名規則の統一

