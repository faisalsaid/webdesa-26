"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function deleteStaffPosition(id: number): Promise<Result> {
  authorize(["ADMIN"]);
  try {
    const existing = await prisma.staffPosition.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Jabatan tidak ditemukan",
      };
    }

    // Hapus jabatan
    await prisma.staffPosition.delete({
      where: { id },
    });

    revalidatePath("/");
    return {
      success: true,
      message: `Jabatan "${existing.name}" berhasil dihapus`,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi masalah!",
    };
  }
}
