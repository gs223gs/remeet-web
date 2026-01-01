"use client";
import { Building, CircleUserRound, Home, Tag, Users } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "./ui/color-mode-toggle";

import type { Route } from "next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenu,
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
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={i.url}>
                      <i.icon />
                      {(isMobile || open) && i.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <CircleUserRound /> {(isMobile || open) && "PROFILE"}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" side="top">
                  <ModeToggle />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
