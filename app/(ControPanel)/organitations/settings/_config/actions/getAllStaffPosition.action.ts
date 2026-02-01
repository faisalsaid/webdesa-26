"use server";

import { authorize } from "@/lib/auth-check";
import { TStaffPosition, TStaffTypeFormInput } from "../dto/staffType.type";
import prisma from "@/lib/prisma";
import { QGetAllPositionsType } from "../dto/staffType.Query";

type Result = {
  success: boolean;
  message?: string;
  staffPositions?: TStaffPosition[];
};

export async function getAllStaffPosition(): Promise<Result> {
  authorize(["ADMIN", "OPERATOR"]);

  try {
    const staffPositions = await prisma.staffPosition.findMany({
      ...QGetAllPositionsType,
    });

    return {
      success: true,
      staffPositions: staffPositions,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi masalah",
    };
  }
}
