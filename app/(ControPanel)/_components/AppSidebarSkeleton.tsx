import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSidebarSkeleton() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              {/* Icon Skeleton */}
              <Skeleton className="h-6 w-6 rounded-md" />
              {/* Text Skeleton */}
              <Skeleton className="h-4 w-24 ml-2" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Mengulangi skeleton item untuk mensimulasikan menu */}
        <div className="space-y-4 mt-4">
          {/* Judul Group */}
          <Skeleton className="h-3 w-16 ml-2 mb-2" />

          {/* List Menu Items */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-1">
              <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
