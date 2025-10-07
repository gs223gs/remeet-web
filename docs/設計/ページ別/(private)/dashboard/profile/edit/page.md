# タイトル: プロフィール編集（/dashboard/profile/edit）

## 目的 / Purpose
- 自身のプロフィール情報を編集する

## URL / ルーティング
- パス: `/dashboard/profile/edit`
- 動的パラメータ: なし
- クエリ: なし

## アクセス制御 / Auth
- 認証必須（自己のみ編集可能）

## コンテンツ / 情報設計
- 入力項目: 名前/肩書/自己紹介/リンク/公開設定 など [TODO]

## UI / UX
- フォーム/プレビュー/バリデーション表示 [TODO]

## 入力 / 検証
- zod 等での検証 [TODO]

## 振る舞い / イベント
- 保存成功時: `/dashboard/profile` へ遷移/トースト [TODO]

## データ依存 / API
- GET `/api/profile/me`, PUT `/api/profile/me`（仮）

## エラーハンドリング
- バリデーション/409 等 [TODO]

## アクセシビリティ
- [TODO]

## テスト観点
- 必須項目/成功時遷移

## 未決事項 / メモ
- [TODO]

