"use server";

import { authorize } from "@/lib/auth-check";
import { TVillageInput } from "../dto/villageForm.type";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

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
    const { id, longitude, latitude, ...rest } = payload;
    console.log(id); // must be undifiend

    const createData: Prisma.VillageConfigUncheckedCreateInput = {
      ...rest,
      ...(longitude !== undefined && {
        longitude: new Decimal(longitude!),
      }),
      ...(latitude !== undefined && {
        latitude: new Decimal(latitude!),
      }),
    };
    await prisma.villageConfig.create({ data: createData });

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
