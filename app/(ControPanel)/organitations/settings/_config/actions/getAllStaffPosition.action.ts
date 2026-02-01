"use server";

import { authorize } from "@/lib/auth-check";
import { TStaffPosition, TStaffTypeFormInput } from "../dto/staffType.type";
import prisma from "@/lib/prisma";
import { QGetAllPositionsType } from "../dto/staffType.Query";
import { StaffLevel } from "@/app/generated/prisma/enums";

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

    const priority: Record<StaffLevel, number> = {
      TOP: 1,
      MIDDLEUP: 2,
      MIDDLE: 3,
      LOWER: 4,
      STAFF: 5,
      OTHER: 6,
    };

    const sortedPositions = staffPositions.sort(
      (a, b) => priority[a.positionType] - priority[b.positionType],
    );

    return {
      success: true,
      staffPositions: sortedPositions,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi masalah",
    };
  }
}
