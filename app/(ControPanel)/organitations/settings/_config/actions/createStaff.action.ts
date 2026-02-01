"use server";

import prisma from "@/lib/prisma";
import { TStaffFormInput } from "../dto/staffType.type";
import { revalidatePath } from "next/cache";
import { authorize } from "@/lib/auth-check";

type Result = {
  success: boolean;
  message?: string;
};

export async function createStaff(payload: TStaffFormInput): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);
  try {
    await prisma.staff.create({
      data: payload,
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Berhasil menambah perangkat desa",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server Error, terjadi kesalahan",
    };
  }
}
