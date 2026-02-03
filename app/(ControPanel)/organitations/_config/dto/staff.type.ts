import { Prisma } from "@/app/generated/prisma/client";
import { QGetStaffDataTable } from "./staff.query";

export type TStaffDataTable = Prisma.StaffGetPayload<typeof QGetStaffDataTable>;

export type TStaffDataTableResult = {
  dataTable: TStaffDataTable[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};
