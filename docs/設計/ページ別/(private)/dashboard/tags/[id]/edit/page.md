# タイトル: タグ編集（/dashboard/tags/[id]/edit）

## 目的 / Purpose
- 既存タグの編集

## URL / ルーティング
- パス: `/dashboard/tags/[id]/edit`
- 動的パラメータ: `[id]: string`（UUID等）
- クエリ: なし

## アクセス制御 / Auth
- 認証必須

## コンテンツ / 情報設計
- 入力項目: 名前/色 など [TODO]

## UI / UX
- 既存値のロード/未存在時の扱い [TODO]

## 入力 / 検証
- zod等での検証 [TODO]

## 振る舞い / イベント
- 保存成功時: 一覧へ戻る/トースト [TODO]

## データ依存 / API
- GET `/api/tags/[id]`, PUT `/api/tags/[id]`（仮）

## エラーハンドリング
- 404/409 等 [TODO]

## アクセシビリティ
- [TODO]

## テスト観点
- 取得失敗時/更新成功時

## 未決事項 / メモ
- [TODO]

