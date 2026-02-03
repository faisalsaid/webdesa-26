"use server";

import prisma from "@/lib/prisma";
import { QGetResidentsDashboardQuery } from "../dto/dashboard.query";

interface GenderGroupResult {
  gender: "MALE" | "FEMALE";
  _count: {
    gender: number;
  };
}

export async function getDashboardResident() {
  try {
    const [residents, totalCount, stats] = await prisma.$transaction([
      prisma.resident.findMany({
        ...QGetResidentsDashboardQuery,
        take: 5,
        where: {
          deletedAt: { in: null },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.resident.count({ where: { deletedAt: { in: null } } }),

      prisma.resident.groupBy({
        by: ["gender"],
        where: { deletedAt: { in: null } },
        _count: {
          gender: true,
        },
        orderBy: {
          gender: "asc",
        },
      }),
    ]);

    const typedStats = stats as unknown as GenderGroupResult[];

    const genderStats = {
      MALE: typedStats.find((s) => s.gender === "MALE")?._count.gender ?? 0,
      FEMALE: typedStats.find((s) => s.gender === "FEMALE")?._count.gender ?? 0,
    };
    return { residents, totalCount, genderStats };
  } catch (err: unknown) {
    console.log(err);
  }
}
