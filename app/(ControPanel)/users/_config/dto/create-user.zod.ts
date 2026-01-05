import { UserRole } from "@/app/generated/prisma";
import z from "zod";

export const CreateUserSchema = z.object({
  email: z.email("Invalid email address"),
  role: z.enum(UserRole, { message: "Invalid role" }),
});

export type TCreateUser = z.infer<typeof CreateUserSchema>;
