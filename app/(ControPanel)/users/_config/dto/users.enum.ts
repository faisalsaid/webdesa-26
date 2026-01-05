import { UserRole } from "@/app/generated/prisma/enums";
import { createEnumHelpers } from "@/lib/helper/createEnumHelper";

export const UserRoleLabels: Record<UserRole, string> = {
  ADMIN: "Administratror",
  OPERATOR: "Operator",
  EDITOR: "Editor",
  USER: "User",
};

export const {
  zodEnum: UserRoleEnum,
  options: userRoleOptions,
  labelMap: userRoleLabelMap,
} = createEnumHelpers(UserRole, UserRoleLabels);
