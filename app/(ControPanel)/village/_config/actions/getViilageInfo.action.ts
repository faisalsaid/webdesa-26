"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { QGetVillage, TVillage } from "../dto/village.type";

export type VillageResult = {
  success: boolean;
  message?: string;
  data?: TVillage;
};

export const getVillageData = async (): Promise<VillageResult> => {
  authorize(["ADMIN", "OPERATOR"]);

  try {
    const res = await prisma.villageConfig.findFirst({
      ...QGetVillage,
    });

    if (!res) {
      return {
        success: false,
        message: "Village data is null",
      };
    }

    return {
      success: true,
      data: res,
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: "Server error, something wrong!",
    };
  }
};
