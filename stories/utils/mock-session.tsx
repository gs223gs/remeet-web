import type { Session } from "next-auth";
import { SessionContext, type SessionContextValue } from "next-auth/react";
import type { ReactNode } from "react";

type SessionUser = NonNullable<Session["user"]>;

const defaultUser: SessionUser = {
  name: "山田 太郎",
  email: "taro@example.com",
  image: "https://i.pravatar.cc/120?img=56",
};

export const createMockSession = (
  overrides?: Partial<SessionUser>,
): Session => ({
  user: { ...defaultUser, ...overrides },
  expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
});

export const defaultSession = createMockSession();

export type SessionStatus = SessionContextValue["status"];

export function MockSessionProvider({
  session = defaultSession,
  status = "authenticated",
  children,
}: {
  session?: Session | null;
  status?: SessionStatus;
  children: ReactNode;
}) {
  const resolvedSession =
    status === "authenticated" ? (session ?? defaultSession) : null;

  const value: SessionContextValue =
    status === "authenticated"
      ? {
          data: session ?? defaultSession,
          status,
          update: async () => session ?? defaultSession,
        }
      : {
          data: null,
          status,
          update: async () => null,
        };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
