export type ProviderOptions = {
  id: string;
  label: string;
  icon: () => React.ReactElement;
  action: () => void;
  isPending: boolean;
  state: {
    ok: false;
    error: AppError;
  } | void | null;
};
export type ErrorState = { ok: false; error: AppError } | void | null;
