"use server";

import prisma from "@/lib/prisma";
import { QGetVilageDashboardQuery } from "../dto/dashboard.query";

export async function getVillageInfo() {
  return await prisma.villageConfig.findFirst(QGetVilageDashboardQuery);
}
