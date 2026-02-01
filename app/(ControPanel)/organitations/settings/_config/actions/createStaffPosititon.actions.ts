"use server";

import prisma from "@/lib/prisma";
import { TStaffTypeFormInput } from "../dto/staffType.type";
import { authorize } from "@/lib/auth-check";
import { StaffPositionFormInput } from "../dto/staffType.zod";
import slugify from "slugify";

type Result = {
  success: boolean;
  message?: string;
};

export async function createStaffPosititon(
  payload: TStaffTypeFormInput,
): Promise<Result> {
  authorize(["ADMIN"]);

  try {
    const parsedData = StaffPositionFormInput.parse(payload);
    const slug = slugify(parsedData.name, { lower: true, strict: true });
    await prisma.staffPosition.create({
      data: {
        name: parsedData.name,
        slug,
        description: parsedData.description ?? null,
        isUnique: parsedData.isUnique,
        positionType: parsedData.positionType,
      },
    });

    return {
      success: true,
      message: "Berhasil membuat jabatan baru!",
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: "Server error, terjadi masalah!",
    };
  }
}
