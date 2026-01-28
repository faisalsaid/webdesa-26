import { Prisma } from "@/app/generated/prisma/client";
import z from "zod";
import { ResidentInputSchema } from "./resident.zod";

export const QGetResidentsDataTable = {
  select: {
    id: true,
    urlId: true,
    fullName: true,
    imageUrl: true,
    gender: true,
    birthDate: true,
    populationStatus: true,
    createdAt: true,
    updatedAt: true,
    family: {
      select: {
        id: true,
        urlId: true,
        familyCardNumber: true,
      },
    },
  },
} satisfies Prisma.ResidentFindManyArgs;

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
