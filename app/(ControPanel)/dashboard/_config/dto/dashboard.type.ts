import { Prisma } from "@/app/generated/prisma/client";

export const QGetVilageDashboardQuery = {
  select: {
    villageName: true,
    villageCode: true,
    officeAddress: true,
    regencyName: true,
    provinceName: true,
    districtName: true,
  },
} satisfies Prisma.VillageConfigFindFirstArgs;

export type TVillageDashboard = Prisma.VillageConfigGetPayload<
  typeof QGetVilageDashboardQuery
>;
