"use server";

import prisma from "@/lib/prisma";
import { QGetUsers, TUser } from "../dto/user.type";

export async function getUserById(
  id: string
): Promise<{ success: boolean; data?: TUser; message?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      ...QGetUsers,
    });
    if (!user) {
      return {
        success: false,
        message: "User Tidak Ditemukan",
      };
    }
    return {
      success: true,
      data: user,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Gagal mengambil data user",
    };
  }
}
