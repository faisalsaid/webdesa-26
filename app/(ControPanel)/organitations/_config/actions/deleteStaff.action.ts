"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function deleteStaff(id: number): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);

  try {
    const existing = await prisma.staff.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Perangkat tidak ditemukan",
      };
    }

    await prisma.staff.delete({
      where: { id },
    });

    revalidatePath("/");
    return {
      success: true,
      message: `perangkat "${existing.name}" berhasil dihapus`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error, something wrong",
    };
  }
}
