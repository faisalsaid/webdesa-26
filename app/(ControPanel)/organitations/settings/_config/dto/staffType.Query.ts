import { Prisma } from "@/app/generated/prisma/client";

export const QGetAllPositionsType = {
  include: { staffAssignments: { select: { id: true } } },
} satisfies Prisma.StaffPositionFindManyArgs;
