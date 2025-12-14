import { AlertCircle } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ServerErrorCard() {
  return (
    <Card className="border border-red-200/70 bg-red-50 text-red-900 shadow-none">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-red-500/10 text-red-600">
            <AlertCircle className="size-5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-red-900">
              サーバーエラー
            </CardTitle>
            <CardDescription className="text-sm text-red-700">
              少し時間を置いてから再度送信するか、ページを更新してください。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
