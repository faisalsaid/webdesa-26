"use server";

import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { QGetVillage, TVillage } from "../dto/village.type";
import { TVillageInput } from "../../update/_config/dto/villageForm.type";

export type VillageResult = {
  success: boolean;
  message?: string;
  data?: TVillageInput;
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

    const sanitize = {
      ...res,
      latitude: res.latitude?.toNumber(),
      longitude: res.longitude?.toNumber(),
    };
    return {
      success: true,
      data: sanitize,
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: "Server error, something wrong!",
    };
  }
};
