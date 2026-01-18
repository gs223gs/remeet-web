type ErrorCode =
  | "unauthenticated" //認証情報が無い/失効した（ログイン必須処理で未ログイン）
  | "authorization" // 認証済みだが権限不足（他ユーザーのリソース操作など）
  | "validation" // 入力パラメータやフォーム値がビジネスルールに違反
  | "not_found" // 指定 ID 等のリソースが存在しない
  | "conflict" //一意制約違反やリソースの競合
  | "db_error" //DB 接続/クエリ/トランザクション失敗などインフラ由来
  | "unknown"; //原因特定できない例外や想定外の失敗を最後に受けるコード

export type AppError = {
  code: ErrorCode;
  message?: string[]; // UIに出せる安全な文言
  details?: unknown; // 内部用の追加情報（ログ用）
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

//TODO 本当はResult に統一したいがrefactorするのは後回しにする // これ撤回 Result<T>を Repository, service で使った方がいい
export type MigrationResult<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };
