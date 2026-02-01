import { StaffLevel } from "@/app/generated/prisma/enums";
import { createEnumHelpers } from "@/lib/helper/createEnumHelper";

export const StaffLevelLabel: Record<StaffLevel, string> = {
  TOP: "Kepala Desa",
  MIDDLEUP: "Sekretaris Desa",
  MIDDLE: "Kepala Urusan / Kepala Seksi",
  LOWER: "Kepala Dusun",
  STAFF: "Perangkat Desa",
  OTHER: "Lainnya",
};

export const {
  zodEnum: StaffLevelEnum,
  options: staffLevelOptions,
  labelMap: staffLevelLabelMap,
} = createEnumHelpers(StaffLevel, StaffLevelLabel);
