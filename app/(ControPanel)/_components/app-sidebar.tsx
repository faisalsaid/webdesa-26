"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { GalleryVerticalEnd } from "lucide-react";
import CPSidebarGroup from "./CPSidebarGroup";
import { getRoleBasedMenu } from "../_config/menuUtils";
import { useUserStore } from "@/store/curentUser.store";
import { AppSidebarSkeleton } from "./AppSidebarSkeleton";

export function AppSidebar() {
  // console.log('SIDEBAR');

  const currentUser = useUserStore((state) => state.user);
  if (!currentUser) {
    return <AppSidebarSkeleton />;
  }
  const role = currentUser?.role as string;

  // console.log('USER ROLE', role);

  const filteredMenu = getRoleBasedMenu(role.toUpperCase());

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <GalleryVerticalEnd />
                <Link href={"/dashboard"}>Website Desa</Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <CPSidebarGroup listMenu={filteredMenu} title="admin" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
