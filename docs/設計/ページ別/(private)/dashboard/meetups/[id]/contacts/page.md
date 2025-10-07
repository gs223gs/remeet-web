# タイトル: 出会った人一覧（/dashboard/meetups/[id]/contacts）

## 目的 / Purpose
- 特定ミートアップの出会った人（Contacts）を管理

## URL / ルーティング
- パス: `/dashboard/meetups/[id]/contacts`
- 動的パラメータ: `[id]: string`（Meetup ID）
- クエリ: `?q=...&page=...` など [TODO]

## アクセス制御 / Auth
- 認証必須

## コンテンツ / 情報設計
- 一覧/作成ボタン/タグ/メモ 等 [TODO]

## UI / UX
- テーブル/空状態/スケルトン [TODO]

## 入力 / 検証
- 検索入力のバリデーション [TODO]

## 振る舞い / イベント
- 新規作成/編集への遷移 [TODO]

## データ依存 / API
- GET `/api/meetups/[id]/contacts`（仮）

## エラーハンドリング
- [TODO]

## アクセシビリティ
- [TODO]

## テスト観点
- ページネーション/検索/ソート

## 未決事項 / メモ
- 参加者リストをミートアップ詳細に出すかの方針

