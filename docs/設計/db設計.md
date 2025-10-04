# DB 設計

## users

| カラム名       | 型          | 制約・備考                       |
| -------------- | ----------- | -------------------------------- |
| id             | uuid        | PK / `DEFAULT gen_random_uuid()` |
| name           | text        | NOT NULL                         |
| email          | text        | NOT NULL / UNIQUE                |
| email_verified | boolean     | NOT NULL / `DEFAULT false`       |
| created_at     | timestamptz | NOT NULL / `DEFAULT now()`       |
| updated_at     | timestamptz | NOT NULL / トリガー更新          |

## contacts

| カラム名     | 型          | 制約・備考                           |
| ------------ | ----------- | ------------------------------------ |
| id           | uuid        | PK / `DEFAULT gen_random_uuid()`     |
| user_id      | uuid        | NOT NULL / FK → `users.id`（所有者） |
| name         | text        | NOT NULL                             |
| job          | text        | NULL 可                              |
| role         | text        | NULL 可                              |
| company      | text        | NULL 可                              |
| description  | text        | NULL 可                              |
| github_url   | text        | NULL 可                              |
| twitter_id   | text        | NULL 可                              |
| profile_url  | text        | NULL 可                              |
| product_name | text        | NULL 可                              |
| product_url  | text        | NULL 可                              |
| created_at   | timestamptz | NOT NULL / `DEFAULT now()`           |
| updated_at   | timestamptz | NOT NULL / トリガー更新              |

## meetups

| カラム名     | 型          | 制約・備考                       |
| ------------ | ----------- | -------------------------------- |
| id           | uuid        | PK / `DEFAULT gen_random_uuid()` |
| user_id      | uuid        | NOT NULL / FK → `users.id`       |
| name         | text        | NOT NULL                         |
| scheduled_at | timestamptz | NOT NULL（開催/参加日時）        |
| created_at   | timestamptz | NOT NULL / `DEFAULT now()`       |
| updated_at   | timestamptz | NOT NULL / トリガー更新          |

## contact_meetups

| カラム名   | 型          | 制約・備考                        |
| ---------- | ----------- | --------------------------------- |
| id         | uuid        | PK / `DEFAULT gen_random_uuid()`  |
| contact_id | uuid        | NOT NULL / FK → `contacts.id`     |
| meetup_id  | uuid        | NOT NULL / FK → `meetups.id`      |
| created_at | timestamptz | NOT NULL / `DEFAULT now()`        |
| updated_at | timestamptz | NOT NULL / トリガー更新           |

## tags

| カラム名   | 型          | 制約・備考                       |
| ---------- | ----------- | -------------------------------- |
| id         | uuid        | PK / `DEFAULT gen_random_uuid()` |
| user_id    | uuid        | NOT NULL / FK → `users.id`       |
| name       | text        | NOT NULL                         |
| created_at | timestamptz | NOT NULL / `DEFAULT now()`       |
| updated_at | timestamptz | NOT NULL / トリガー更新          |

## contact_tags

| カラム名   | 型          | 制約・備考                       |
| ---------- | ----------- | -------------------------------- |
| id         | uuid        | PK / `DEFAULT gen_random_uuid()` |
| contact_id | uuid        | NOT NULL / FK → `contacts.id`    |
| tag_id     | uuid        | NOT NULL / FK → `tags.id`        |
| created_at | timestamptz | NOT NULL / `DEFAULT now()`       |
| updated_at | timestamptz | NOT NULL / トリガー更新          |

## profiles

| カラム名     | 型          | 制約・備考                 |
| ------------ | ----------- | -------------------------- |
| user_id      | uuid        | PK / FK → `users.id`       |
| name         | text        | NOT NULL                   |
| job          | text        | NULL 可                    |
| role         | text        | NULL 可                    |
| company      | text        | NULL 可                    |
| description  | text        | NULL 可                    |
| github_url   | text        | NULL 可                    |
| twitter_id   | text        | NULL 可                    |
| profile_url  | text        | NULL 可                    |
| product_name | text        | NULL 可                    |
| product_url  | text        | NULL 可                    |
| created_at   | timestamptz | NOT NULL / `DEFAULT now()` |
| updated_at   | timestamptz | NOT NULL / トリガー更新    |

```mermaid
erDiagram
    users ||--o{ contacts : registers
    users ||--o{ tags : creates
    users ||--|| profiles : has
    users ||--o{ meetups : owns
    meetups ||--o{ contact_meetups : includes
    contacts ||--o{ contact_meetups : attends
    contacts ||--o{ contact_tags : tagged
    tags ||--o{ contact_tags : labels

    users {
        uuid id PK
        text name
        text email
        boolean email_verified
        timestamptz created_at
        timestamptz updated_at
    }

    meetups {
        uuid id PK
        uuid user_id FK
        text name
        timestamptz scheduled_at
        timestamptz created_at
        timestamptz updated_at
    }

    contacts {
        uuid id PK
        uuid user_id FK
        text name
        text job
        text role
        text company
        text description
        text github_url
        text twitter_id
        text profile_url
        text product_name
        text product_url
        timestamptz created_at
        timestamptz updated_at
    }

    contact_meetups {
        uuid id PK
        uuid contact_id FK
        uuid meetup_id FK
        timestamptz created_at
        timestamptz updated_at
    }

    tags {
        uuid id PK
        uuid user_id FK
        text name
        timestamptz created_at
        timestamptz updated_at
    }

    contact_tags {
        uuid id PK
        uuid contact_id FK
        uuid tag_id FK
        timestamptz created_at
        timestamptz updated_at
    }

    profiles {
        uuid user_id PK
        text name
        text job
        text role
        text company
        text description
        text github_url
        text twitter_id
        text profile_url
        text product_name
        text product_url
        timestamptz created_at
        timestamptz updated_at
    }
```
