"use server";

import { authorize } from "@/lib/auth-check";
import { TResidentFormInput } from "../dto/resident.type";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma/client";

type Result = {
  success: boolean;
  message?: string;
};

export async function createResident(
  data: TResidentFormInput,
): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);

  const { id, urlId, ...rest } = data;

  console.log(id, urlId);

  try {
    await prisma.resident.create({ data: rest });
    revalidatePath("/");
    return {
      success: true,
      message: "Berhasil menambah data penduduk",
    };
  } catch (error: unknown) {
    console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // unique constraint
      return { success: false, message: "NIK Sudah terpakai!" };
    }
    return {
      success: false,
      message: "Server error, terjadi suatu masalah!",
    };
  }
}
