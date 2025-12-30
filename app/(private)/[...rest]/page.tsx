import { notFound } from "next/navigation";

export default function DashboardCatchAll() {
  notFound(); // ← dashboard/not-found.tsx に落ちる
}
