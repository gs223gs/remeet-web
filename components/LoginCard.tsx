import type { ProviderOptions } from "@/type/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  providerOptions: ProviderOptions[];
};
export const LoginCard = ({ providerOptions }: Props) => {
  return (
    <Card className="w-full max-w-lg border border-border/70 shadow-sm">
      <CardContent className="space-y-6 px-6 py-8 sm:px-8">
        <p className="text-xs text-muted-foreground">
          ログインを続行すると、ReMeetの利用規約とプライバシーポリシーに同意したものとみなします。
        </p>
        <div className="space-y-4">
          {providerOptions.map((p) => {
            return (
              <form
                key={p.id}
                action={p.action}
                className="rounded-xl border border-dashed border-orange-200/70 bg-background/60 p-1"
              >
                <Button
                  type="submit"
                  variant="ghost"
                  disabled={p.isPending}
                  className="flex w-full items-center justify-center gap-3 rounded-[inherit] border border-transparent bg-orange-500/5 px-6 py-5 text-base font-semibold text-foreground shadow-none transition hover:bg-orange-500/10"
                >
                  <span className="rounded-full bg-white/90 p-2 shadow-sm">
                    <p.icon />
                  </span>
                  <span>{p.isPending ? "ログイン中" : p.label}</span>
                </Button>
              </form>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
