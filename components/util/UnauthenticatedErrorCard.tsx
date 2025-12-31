import { LockKeyhole } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UnauthenticatedErrorCard() {
  return (
    <Card className="border border-yellow-200/80 bg-yellow-50 text-yellow-900 shadow-none">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-700">
            <LockKeyhole className="size-5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-yellow-900">
              認証に失敗しました
            </CardTitle>
            <CardDescription className="text-sm text-yellow-700">
              アクセスが許可されていません。ログインし直すかアカウントを確認してください。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
