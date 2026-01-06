"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserMenu from "./UserMenu";
import { useUserStore } from "@/store/curentUser.store";
import { CPNavbarSkeleton } from "./CPNavbarSkeleton";

const CPNavbar = () => {
  const currentUser = useUserStore((state) => state.user);
  if (!currentUser) {
    return <CPNavbarSkeleton />;
  }
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-10 bg-primary-foreground">
      {/* LEFT */}
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="" />
        <ThemeToggle />
        <Link href={"/"}>
          <Button size={"icon"} variant={"outline"}>
            <Home size={16} />
          </Button>
        </Link>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {currentUser ? <UserMenu currentUser={currentUser} /> : null}
      </div>
    </nav>
  );
};

export default CPNavbar;
