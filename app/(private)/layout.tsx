import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";

export const metadata: Metadata = {
  title: "ReMeet",
  description: "ミートアップで出会った人をもう忘れない．",
  icons: [
    {
      rel: "favicon",
      url: "../favicon.ico",
    },
  ],
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <main className="flex-1 min-w-0">{children}</main>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
