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
import getCurrentUser from "@/lib/helper/getCurrentUsers";

export async function AppSidebar() {
  // console.log('SIDEBAR');

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <div>No User</div>;
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
