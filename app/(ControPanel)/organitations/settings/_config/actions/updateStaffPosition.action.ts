"use server";

import { authorize } from "@/lib/auth-check";
import { TStaffTypeFormInput } from "../dto/staffType.type";
import prisma from "@/lib/prisma";

import { StaffPositionFormInput } from "../dto/staffType.zod";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function updateStaffPosition(
  payload: TStaffTypeFormInput,
): Promise<Result> {
  authorize(["ADMIN"]);

  try {
    const { id, ...rest } = payload;
    const parsedData = StaffPositionFormInput.parse(payload);
    const slug = slugify(rest.name, { lower: true, strict: true });

    await prisma.staffPosition.update({
      where: { id },
      data: {
        name: parsedData.name,
        description: parsedData.description ?? null,
        slug,
        isUnique: parsedData.isUnique,
        positionType: parsedData.positionType,
      },
    });

    revalidatePath("/");
    return { success: true, message: "Berhasil perbarui jabatan" };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi masalah!",
    };
  }
}
