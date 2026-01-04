import "../globals.css";
import { HomePageHeader } from "@/app/(public)/HomePageHeader";
export const metadata = {
  title: "ReMeet ログイン",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <HomePageHeader isLoginButton={false} />
        {children}
      </body>
    </html>
  );
}
