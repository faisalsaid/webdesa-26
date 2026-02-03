"use server";

import prisma from "@/lib/prisma";

import { QGetStaffDashboardQuery } from "../dto/dashboard.query";

export async function getStaffDashInfo() {
  return await prisma.staff.findMany({
    where: {
      positionType: {
        positionType: {
          in: ["TOP", "MIDDLEUP", "MIDDLE"],
        },
      },
    },
    ...QGetStaffDashboardQuery,
  });
}
