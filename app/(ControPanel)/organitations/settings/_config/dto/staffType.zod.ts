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
  description: z.string().optional(),
  isUnique: z.boolean(),
  positionType: z.enum(StaffLevel),

  // Relasi, optional karena bisa kosong
  staffAssignments: z.array(z.any()).optional(),
  organizationUnits: z.array(z.any()).optional(),
  staffHistories: z.array(z.any()).optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
