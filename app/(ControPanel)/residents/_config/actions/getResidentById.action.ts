"use server";

import { authorize } from "@/lib/auth-check";
import { TResident } from "../dto/resident.type";
import prisma from "@/lib/prisma";

type Result = {
  success: boolean;
  message?: string;
  resident?: TResident;
};

export async function getResidentById(id: number): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);

  try {
    const res = await prisma.resident.findUnique({
      where: { id },
    });

    if (!res) {
      return {
        success: false,
        message: "Data penduduk tidak ditemukan",
      };
    }

    return {
      success: true,
      resident: res,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi masalah!",
    };
  }
}
