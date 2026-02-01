import { StaffLevel } from "@/app/generated/prisma/enums";
import { createEnumHelpers } from "@/lib/helper/createEnumHelper";

export const StaffLevelLabel: Record<StaffLevel, string> = {
  TOP: "Tertinggi",
  MIDDLEUP: "Menengah atas",
  MIDDLE: "Menengah",
  LOWER: "Bawah",
  STAFF: "Dasar",
  OTHER: "Lainnya",
};

export const {
  zodEnum: StaffLevelEnum,
  options: staffLevelOptions,
  labelMap: staffLevelLabelMap,
} = createEnumHelpers(StaffLevel, StaffLevelLabel);
