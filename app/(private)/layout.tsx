import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ReMeet",
  description: "ミートアップで出会った人をもう忘れない．",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <SessionProvider>
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <main className="flex-1 min-w-0">{children}</main>
                <Toaster />
              </SidebarProvider>
            </SessionProvider>
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
