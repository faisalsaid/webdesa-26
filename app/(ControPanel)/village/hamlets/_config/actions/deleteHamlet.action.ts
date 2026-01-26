"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";

type Result = {
  success: boolean;
  message?: string;
};

export async function deleteHamlet(id: number): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);
  try {
    await prisma.hamlet.delete({
      where: { id },
    });
    return {
      success: true,
      message: "Hapus dusun berhasil",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal Hapus dusun",
    };
  }
}
