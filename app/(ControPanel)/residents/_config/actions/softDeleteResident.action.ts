"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function softDeleteResident(id: number): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);

  try {
    await prisma.resident.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Penduduk berhasil dihapus",
    };
  } catch (error: unknown) {
    console.error("Delete resident failed:", error);
    return {
      success: false,
      message: "Server error, terjadi kesalahan",
    };
  }
}
