import type { ErrorState } from "@/type/auth";

export const hasUnauthenticatedError = (states: ErrorState[]): boolean => {
  return states.some((s) => s?.error?.code === "unauthenticated");
};
