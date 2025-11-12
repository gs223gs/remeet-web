"use client";
import { Building, CircleUserRound, Home, Tag, Users } from "lucide-react";
import Link from "next/link";

import type { Route } from "next";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const item: {
  title: string;
  url: Route;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { title: "HOME", url: "/dashboard", icon: Home },
  { title: "MEETUP", url: "/dashboard/meetup", icon: Building },
  { title: "CONTACTS", url: "/dashboard/contacts", icon: Users },
  { title: "TAGS", url: "/dashboard/tags", icon: Tag },
];
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
          {item.map((i) => {
            return (
              <SidebarGroup key={i.title}>
                <Link href={i.url}>
                  <span className=" flex  gap-2">
                    <i.icon />
                    {(isMobile || open) && i.title}
                  </span>
                </Link>
              </SidebarGroup>
            );
          })}
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
