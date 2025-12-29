"use client";
import { Building, CircleUserRound, Home, Tag, Users } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "./ui/color-mode-toggle";

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
      <Sidebar collapsible="icon" variant="sidebar">
        {open ? (
          <SidebarHeader>
            <div className="flex items-center justify-between h-12">
              <div className="text-3xl leading-none">ReMeet</div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
        ) : (
          <div className="h-16 flex items-center justify-center">
            <SidebarTrigger />
          </div>
        )}
        <SidebarContent>
          {item.map((i) => {
            return (
              <SidebarGroup key={i.title}>
                <Link href={i.url}>
                  <span className=" flex  gap-2 ">
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
          <div className="flex justify-between items-center h-10">
            <span className=" flex  gap-2">
              <CircleUserRound />
              {(isMobile || open) && "PROFILE"}
            </span>
            {(isMobile || open) && <ModeToggle />}
            {/* </Link> */}
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
