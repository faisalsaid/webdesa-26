"use server";

import { authorize } from "@/lib/auth-check";
import { TStaffFormInput } from "../../settings/_config/dto/staffType.type";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};
export async function updateStaff(data: TStaffFormInput): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);
  try {
    const { id, urlId, ...rest } = data;
    await prisma.staff.update({
      where: { id },
      data: rest,
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Berhasil perbarui data perangkat",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Server error, terjadi kesalahan!",
    };
  }
}
