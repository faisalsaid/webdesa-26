// lib/auth-check.ts
import { UserRole } from "@/app/generated/prisma/enums";
import getCurrentUser from "./helper/getCurrentUsers";

export async function authorize(allowedRoles?: UserRole[]) {
  // Jika allowedRoles tidak didefinisikan, berarti PUBLIC
  if (!allowedRoles) {
    return null;
  }

  const curentUser = await getCurrentUser();

  const userRole = curentUser?.role as UserRole;

  if (!allowedRoles.includes(userRole)) {
    throw new Error("Forbidden: Role Anda tidak diizinkan.");
  }

  return curentUser;
}
