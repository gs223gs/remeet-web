export type ActionState<T> =
  | {
      success: boolean;
      errors: T;
    }
  | { success: true }
  | { success: false; error: T };
