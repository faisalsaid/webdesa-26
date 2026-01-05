"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  try {
    await authorize(["ADMIN"]);

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/users");
    return { success: true, message: "User berhasil dihapus" };
  } catch (error) {
    console.error("Delete User Error:", error);
    return {
      success: false,
      message: "Gagal menghapus user atau Anda tidak memiliki akses",
    };
  }
}
