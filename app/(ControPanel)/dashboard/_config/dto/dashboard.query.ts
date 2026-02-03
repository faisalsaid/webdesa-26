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

export const QGetStaffDashboardQuery = {
  include: {
    positionType: true,
  },
} satisfies Prisma.StaffFindManyArgs;
