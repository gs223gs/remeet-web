type ErrorCode =
  | "unauthenticated"
  | "authorization"
  | "validation"
  | "not_found"
  | "conflict"
  | "db_error"
  | "unknown";

export type AppError = {
  code: ErrorCode;
  message: string[]; // UIに出せる安全な文言
  details?: unknown; // 内部用の追加情報（ログ用）
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

//TODO 本当はResult に統一したいがrefactorするのは後回しにする
export type RepositoryResult<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };
