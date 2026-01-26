import z from "zod";
import { HamletInputSchema } from "./hamlet.zod";
import { Prisma } from "@/app/generated/prisma/client";
import { QGetHamletsDataTable } from "./hamlet.query";

export type THamletFormInput = z.infer<typeof HamletInputSchema>;

export type THamlets = Prisma.HamletGetPayload<typeof QGetHamletsDataTable>;

export type THamletsDataTable = {
  dataTable: THamlets[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};
