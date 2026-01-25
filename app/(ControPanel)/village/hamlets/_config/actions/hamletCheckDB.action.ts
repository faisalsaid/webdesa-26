"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";

export async function hamletCheckDB() {
  await authorize(["ADMIN", "OPERATOR"]);

  const count = await prisma.hamlet.findFirst({
    select: {
      id: true,
    },
  });
  return count;
}
