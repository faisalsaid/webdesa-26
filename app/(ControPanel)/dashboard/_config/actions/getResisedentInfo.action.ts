"use server";

import prisma from "@/lib/prisma";
import { QGetResidentsDashboardQuery } from "../dto/dashboard.type";

export async function getDashboardResident() {
  try {
    return await prisma.resident.findMany({
      ...QGetResidentsDashboardQuery,
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err: unknown) {
    console.log(err);
  }
}
