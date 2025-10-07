## 必要なページ

### public

/(root)
/profile/[slug]

> nfc 読み込んだ時のプロフィールページ

### private

/dashboard

> 管理ページ

#### タグ管理

/dashboard/tags
/dashboard/tags/new
/dashboard/tags/[id]/edit

#### ミートアップ管理

/dashboard/meetups
/dashboard/meetups/new
/dashboard/meetups/[id]

> ミートアップ自体の情報を管理
> もし，この画面に参加者リストを出すなら /dashboard/meetups/[id]/contacts いらないね

/dashboard/meetups/[id]/edit

#### 出会った人管理

/dashboard/meetups/[id]/contacts
/dashboard/meetups/[id]/contacts/new
/dashboard/meetups/[id]/contacts/[id]/edit

#### プロフィール管理

/dashboard/profile
/dashboard/profile/edit

### auth

/auth/login
/auth/register
/auth/reset-password （メールリンクは `?token=...` 付与想定）
/auth/change-email （または `/auth/email-reset`）
/auth/verify-email （メールリンクは `?token=...` 付与想定）
