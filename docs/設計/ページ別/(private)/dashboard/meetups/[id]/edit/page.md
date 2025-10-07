# タイトル: ミートアップ編集（/dashboard/meetups/[id]/edit）

## 目的 / Purpose
- 既存ミートアップの編集

## URL / ルーティング
- パス: `/dashboard/meetups/[id]/edit`
- 動的パラメータ: `[id]: string`
- クエリ: なし

## アクセス制御 / Auth
- 認証必須

## コンテンツ / 情報設計
- 入力項目: タイトル/日時/場所/説明/タグ 等 [TODO]

## UI / UX
- 既存値ロード/未存在時の扱い [TODO]

## 入力 / 検証
- zod 等での検証 [TODO]

## 振る舞い / イベント
- 保存成功時: 詳細/一覧へ遷移 [TODO]

## データ依存 / API
- GET `/api/meetups/[id]`, PUT `/api/meetups/[id]`（仮）

## エラーハンドリング
- 404/409 等 [TODO]

## アクセシビリティ
- [TODO]

## テスト観点
- 取得失敗/更新成功

## 未決事項 / メモ
- [TODO]

