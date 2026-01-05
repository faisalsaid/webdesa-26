"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export function ForceLogoutGuard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.forceLogout) {
      signOut({ callbackUrl: "/auth/login?expired=1" });
    }
  }, [session, status]);

  return null;
}
