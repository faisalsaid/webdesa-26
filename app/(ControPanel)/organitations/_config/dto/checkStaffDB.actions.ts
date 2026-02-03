"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";

export async function checkStaffDB() {
  await authorize(["ADMIN", "OPERATOR"]);

  const count = await prisma.staff.findFirst({
    select: {
      id: true,
    },
  });
  return count;
}
