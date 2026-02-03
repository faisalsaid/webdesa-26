import { Prisma } from "@/app/generated/prisma/client";

export const QGetStaffDataTable = {
  include: {
    positionType: {
      select: {
        id: true,
        name: true,
      },
    },
  },
} satisfies Prisma.StaffFindManyArgs;
