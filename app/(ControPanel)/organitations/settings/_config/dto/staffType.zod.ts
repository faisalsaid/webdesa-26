import { StaffLevel } from "@/app/generated/prisma/enums";
import z from "zod";

export const StaffPositionFormInput = z.object({
  id: z.number().int().optional(),

  name: z
    .string()
    .min(2, "Nama Jabatan tidak boleh kosong")
    .max(100)
    .refine(
      (val) => val.trim().length > 0,
      "Nama jabatan tidak boleh hanya spasi",
    ),
  description: z.string().optional().nullable(),
  isUnique: z.boolean(),
  positionType: z.enum(StaffLevel),

  // Relasi, optional karena bisa kosong
  staffAssignments: z.array(z.any()).optional(),
  organizationUnits: z.array(z.any()).optional(),
  staffHistories: z.array(z.any()).optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const StaffFormInput = z.object({
  id: z.number().int().optional(),
  urlId: z.string().optional().nullable(),
  name: z
    .string()
    .min(2, "Nama tidak boleh kosong")
    .max(100)
    .refine((val) => val.trim().length > 0, "Nama tidak boleh hanya spasi"),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  positionTypeId: z.number().int().positive(),
  residentId: z.number().int().positive().optional().nullable(),

  isActive: z.boolean().optional(),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),
});
