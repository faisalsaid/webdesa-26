"use server";

import { UserRole } from "@/app/generated/prisma/enums";
import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface UpdateUserRoleInput {
  userId: string;
  role: UserRole;
}
export const updateUserRole = async ({ userId, role }: UpdateUserRoleInput) => {
  await authorize(["ADMIN", "OPERATOR"]);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/");
    return updatedUser;
  } catch (error) {
    console.error("❌ Failed to update user role:", error);
    throw new Error("Failed to update user role.");
  }
};
