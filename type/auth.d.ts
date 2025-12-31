export type ProviderOptions = {
  id: string;
  label: string;
  icon: () => React.ReactElement;
  action: () => void;
  isPending: boolean;
  state: ErrorState;
};
export type ErrorState = { ok: false; error: AppError } | void | null;
