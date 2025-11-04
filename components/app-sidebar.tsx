"use client";
import { Building, CircleUserRound, Home, Tag, Users } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// const item: { title: string; url: string; icon: string }[] = [
//   {
//     title: "HOME",
//     url: "/dashboard",
//     icon: "Home",
//   },
//   { title: "MEETUP", url: "/dashboard/meetup", icon: "Building" },
//   { title: "CONTACTS", url: "/dashboard/contacts", icon: "Users" },
//   { title: "TAGS", url: "/dashboard/tags", icon: "Tag" },
// ];
export function AppSidebar() {
  const { open, isMobile } = useSidebar();

  return (
    <>
      {!open && isMobile && <SidebarTrigger />}
      <Sidebar collapsible="icon">
        {open ? (
          <SidebarHeader>
            <div className="flex">
              <div className="text-3xl ">ReMeet</div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
        ) : (
          <SidebarTrigger />
        )}
        <SidebarContent>
          <SidebarGroup>
            <Link href={"/dashboard"}>
              <span className=" flex  gap-2">
                {/**あとでコンポーネント化する */}
                <Home />
                {isMobile ? "HOME" : open && "HOME"}
              </span>
            </Link>
          </SidebarGroup>
          <SidebarGroup>
            <Link href={"/dashboard/meetup"}>
              <span className=" flex  gap-2">
                <Building />
                {isMobile ? "MEETUP" : open && "MEETUP"}
              </span>
            </Link>
          </SidebarGroup>
          <SidebarGroup>
            <Link href={"/dashboard/contacts"}>
              <span className=" flex  gap-2">
                <Users />
                {isMobile ? "CONTACTS" : open && "CONTACTS"}
              </span>
            </Link>
          </SidebarGroup>
          <SidebarGroup>
            <Link href={"/dashboard/tags"}>
              <span className=" flex  gap-2">
                <Tag />
                {isMobile ? "TAGS" : open && "TAGS"}
              </span>
            </Link>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {/* <Link href={"/dashboard/profile"}> */}
          <span className=" flex  gap-2">
            <CircleUserRound />
            {isMobile ? "PROFILE" : open && "PROFILE"}
          </span>
          {/* </Link> */}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
