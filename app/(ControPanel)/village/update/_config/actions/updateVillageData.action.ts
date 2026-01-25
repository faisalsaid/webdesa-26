"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { TVillageInput } from "../dto/villageForm.type";
import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/client";

export type TUpdateVillageResult = {
  success: boolean;
  message?: string;
};

export async function updateVillageProfile(
  payload: TVillageInput,
): Promise<TUpdateVillageResult> {
  authorize(["ADMIN", "EDITOR"]);

  const { id, longitude, latitude, ...rest } = payload;

  try {
    const updateData: Prisma.VillageConfigUncheckedUpdateInput = {
      ...rest,
      ...(longitude !== undefined && {
        longitude: new Decimal(longitude!),
      }),
      ...(latitude !== undefined && {
        latitude: new Decimal(latitude!),
      }),
    };
    await prisma.villageConfig.update({
      where: { id },
      data: updateData,
    });
    return {
      success: true,
      message: "Update village profile success",
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: "Server error, something wrong!",
    };
  }
}
