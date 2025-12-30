import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <DashboardHeader
        eyebrow="404"
        title="ページが見つかりません"
        description="指定されたURLが削除されたか、アクセス権限が無効になっている可能性があります。"
      />
    </div>
  );
}
