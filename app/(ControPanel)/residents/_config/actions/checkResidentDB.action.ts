"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";

export async function checkResidentDB() {
  await authorize(["ADMIN", "OPERATOR"]);

  const count = await prisma.resident.findFirst({
    select: {
      id: true,
    },
  });
  return count;
}
