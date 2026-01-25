"use server";

import { authorize } from "@/lib/auth-check";
import { TVillageInput } from "../dto/villageForm.type";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type TAddVillageResult = {
  success: boolean;
  message?: string;
};

export const addVillageData = async (
  payload: TVillageInput,
): Promise<TAddVillageResult> => {
  authorize(["ADMIN", "OPERATOR"]);
  console.log(payload);

  try {
    const { id, ...rest } = payload;
    console.log(id); // must be undifiend

    await prisma.villageConfig.create({ data: rest });

    revalidatePath("/");

    return {
      success: true,
      message: "Village created success",
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: "Server Error, Something wrong!",
    };
  }
};
