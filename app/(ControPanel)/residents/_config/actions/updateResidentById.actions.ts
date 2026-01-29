"use server";

import { authorize } from "@/lib/auth-check";
import { TResidentFormInput } from "../dto/resident.type";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function updateResidentByID(
  payload: TResidentFormInput,
): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);
  const { id, urlId, ...rest } = payload;

  try {
    await prisma.resident.update({
      where: { id },
      data: rest,
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Data penduduk berhasil diperbarui",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi kesalahan!",
    };
  }
}
