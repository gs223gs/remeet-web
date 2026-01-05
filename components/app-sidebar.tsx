"use client";

import { Building, Home, PanelLeftIcon, Tag, Users } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { ModeToggle } from "./ui/color-mode-toggle";

import type { Route } from "next";

import { SidebarUserProfile } from "@/components/SidebarUserProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { RemeetIcon } from "@/components/util/RemeetIcon";

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
  const [mouseOver, setMouseOver] = useState(false);
  const { open, isMobile, setOpenMobile, toggleSidebar } = useSidebar();
  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const handleMouseEnter = () => {
    if (open) return;
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    if (open) return;
    setMouseOver(false);
  };
  const handleSidebarToggle = () => {
    toggleSidebar();
    setMouseOver(false);
  };
  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      toast.error("ログアウトに失敗しました．", {
        description: "しばらく経ってからもう一度お試しください",
      });
    }
  };
  return (
    <>
      {!open && isMobile && (
        <div className="fixed left-4 top-4 z-50">
          <SidebarTrigger />
        </div>
      )}
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {mouseOver ? (
                <PanelLeftIcon
                  onClick={handleSidebarToggle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ) : (
                <RemeetIcon
                  onClick={handleSidebarToggle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              )}
            </SidebarMenuButton>
            <SidebarMenuAction>
              {!isMobile && <PanelLeftIcon onClick={() => toggleSidebar()} />}
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
          {item.map((i) => {
            return (
              <SidebarGroup key={i.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={handleNavClick}>
                    <Link href={i.url}>
                      <i.icon />
                      {i.title}
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
                    <SidebarUserProfile />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" side="top">
                  <DropdownMenuLabel>設定</DropdownMenuLabel>
                  <ModeToggle />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      ログアウト
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
