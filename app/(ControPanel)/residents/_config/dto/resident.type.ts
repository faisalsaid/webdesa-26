import { Prisma } from "@/app/generated/prisma/client";
import z from "zod";
import { ResidentInputSchema } from "./resident.zod";
import { QGetResidentDetails, QGetResidentsDataTable } from "./resident.query";

export type TResidentsDataTable = Prisma.ResidentGetPayload<
  typeof QGetResidentsDataTable
>;

export type TResidentsDataTableResult = {
  dataTable: TResidentsDataTable[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

export type TResidentFormInput = z.infer<typeof ResidentInputSchema>;

export type TResident = Prisma.ResidentGetPayload<typeof QGetResidentDetails>;
