import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/util/routes";

type Props = {
  message?: string;
};

export const ContactsErrorCard = ({ message }: Props) => {
  return (
    <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle>情報取得に失敗しました</CardTitle>
          <CardDescription>
            {message ?? "再度読み込みをお試しください。"}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button
            asChild
            className="bg-orange-500 text-white hover:bg-orange-500/90"
          >
            <Link href={routes.dashboard()}>ダッシュボードへ戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
