"use server";

import prisma from "@/lib/prisma";
import { THamletFormInput } from "../dto/hamlet.type";
import { authorize } from "@/lib/auth-check";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function updateHamlet(paylod: THamletFormInput): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);
  const { id, ...rest } = paylod;
  try {
    await prisma.hamlet.update({
      where: { id },
      data: rest,
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Data dusun berhasil diperbarui",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error, terjadi kesalahan!",
    };
  }
}
