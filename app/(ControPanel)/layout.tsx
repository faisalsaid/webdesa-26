import { SidebarProvider } from "@/components/ui/sidebar";

import { cookies } from "next/headers";
import { AppSidebar } from "./_components/app-sidebar";
import CPNavbar from "./_components/CP_Navbar";

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            "--sidebar-width": "12rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <main className="w-full">
          <CPNavbar />
          <div className="p-4 ">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
