import Link from "next/link";

import { Button } from "@/components/ui/button";
import { RemeetFullLogo } from "@/components/util/RemeetFullLogo";
import { RemeetIcon } from "@/components/util/RemeetIcon";
import { routes } from "@/util/routes";

type Props = {
  isLoginButton?: boolean;
};
export const HomePageHeader = ({ isLoginButton = true }: Props) => {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={routes.home()}>
            <div className="flex flex-row gap-4 items-center ">
              <RemeetIcon size={50} />
              <RemeetFullLogo className="text-orange-500" fill="#fff" />
            </div>
          </Link>

          <nav className="flex items-center space-x-8">
            {isLoginButton && (
              <Button
                className="bg-orange-500 text-white hover:bg-orange-500/90"
                asChild
              >
                <Link href={routes.login()}>ログイン</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
