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

export const QGetResidentsDashboardQuery = {
  select: {
    id: true,
    urlId: true,
    fullName: true,
    nik: true,
    gender: true,
    isActive: true,
    imageKey: true,
    imageUrl: true,
    populationStatus: true,
  },
} satisfies Prisma.ResidentFindManyArgs;

export type TResidentDashboard = Prisma.ResidentGetPayload<
  typeof QGetResidentsDashboardQuery
>;
