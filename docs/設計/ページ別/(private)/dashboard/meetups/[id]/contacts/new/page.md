# タイトル: 出会った人作成（/dashboard/meetups/[id]/contacts/new）

## 目的 / Purpose
- ミートアップ配下に新規コンタクトを作成する

## URL / ルーティング
- パス: `/dashboard/meetups/[id]/contacts/new`
- 動的パラメータ: `[id]: string`（Meetup ID）
- クエリ: なし

## アクセス制御 / Auth
- 認証必須

## コンテンツ / 情報設計
- 入力項目: 氏名/所属/メモ/タグ 等 [TODO]

## UI / UX
- フォーム/バリデーション表示 [TODO]

## 入力 / 検証
- zod 等での検証 [TODO]

## 振る舞い / イベント
- 保存成功時: 一覧へ戻る/トースト [TODO]

## データ依存 / API
- POST `/api/meetups/[id]/contacts`（仮）

## エラーハンドリング
- バリデーション/重複 等 [TODO]

## アクセシビリティ
- [TODO]

## テスト観点
- 必須項目/成功時遷移

## 未決事項 / メモ
- [TODO]

