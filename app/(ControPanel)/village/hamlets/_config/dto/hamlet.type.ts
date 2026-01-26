import z from "zod";
import { HamletInputSchema } from "./hamlet.zod";
import { Prisma } from "@/app/generated/prisma/client";
import { QGetHamletsDataTable } from "./hamlet.query";

export type THamletFormInput = z.infer<typeof HamletInputSchema>;

export type THamlet = Prisma.HamletGetPayload<typeof QGetHamletsDataTable>;

export type THamletsDataTable = {
  dataTable: THamlet[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};
