"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { TStaffPositionOptions } from "../dto/staffType.type";

export async function getStaffPositionToStaffFormOptions(): Promise<
  TStaffPositionOptions[]
> {
  authorize(["ADMIN", "OPERATOR"]);
  const types = await prisma.staffPosition.findMany({
    include: {
      staffAssignments: {
        where: { isActive: true },
        select: { id: true },
      },
    },
  });

  return types.map((t) => ({
    id: t.id,
    name: t.name,
    isUnique: t.isUnique,
    isFilled: t.isUnique && t.staffAssignments.length > 0,
  }));
}
