"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";

export async function checkStaffPositionDB() {
  await authorize(["ADMIN", "OPERATOR"]);

  const count = await prisma.staffPosition.findFirst({
    select: {
      id: true,
    },
  });
  return count;
}
