"use server";

import prisma from "@/lib/prisma";
import { THamletFormInput } from "../dto/hamlet.type";
import { revalidatePath } from "next/cache";

type Result = {
  success: boolean;
  message?: string;
};

export async function createHamlet(payload: THamletFormInput): Promise<Result> {
  const { id, ...rest } = payload;
  console.log(id); //must be undifend;

  try {
    await prisma.hamlet.create({
      data: rest,
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Dusun berhasil ditambahkan",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mebambah dusun",
    };
  }
}
