import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Building, CircleUserRound, Home, Tag, Users } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-3xl">ReMeet</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link href={"/dashboard/"}>
            <span className=" flex  gap-2">
              {/**あとでコンポーネント化する */}
              <Home />
              HOME
            </span>
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/dashboard/meetup"}>
            <span className=" flex  gap-2">
              <Building />
              MEETUPS
            </span>
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/dashboard/contacts"}>
            <span className=" flex  gap-2">
              <Users />
              CONTACTS
            </span>
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/dashboard/tags"}>
            <span className=" flex  gap-2">
              <Tag />
              TAGS
            </span>
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link href={"/dashboard/porofile"}>
          <span className=" flex  gap-2">
            <CircleUserRound />
            PROFILE
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
