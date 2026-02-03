import { Prisma } from "@/app/generated/prisma/client";
import {
  QGetResidentsDashboardQuery,
  QGetStaffDashboardQuery,
  QGetVilageDashboardQuery,
} from "./dashboard.query";

export type TVillageDashboard = Prisma.VillageConfigGetPayload<
  typeof QGetVilageDashboardQuery
>;

export type TResidentDashboard = Prisma.ResidentGetPayload<
  typeof QGetResidentsDashboardQuery
>;

export type TStaffDashboard = Prisma.StaffGetPayload<
  typeof QGetStaffDashboardQuery
>;
