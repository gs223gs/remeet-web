import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-3xl">ReMeet</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link href={"/dashboard/"}>
            <span className=" flex  gap-2">
              <Home />
              HOME
            </span>
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/dashboard/meetup"}>meetup</Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/dashboard/contscts"}>contacts</Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/dashboard/tag"}>tag</Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
