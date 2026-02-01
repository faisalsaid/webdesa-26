import z from "zod";
import { StaffFormInput, StaffPositionFormInput } from "./staffType.zod";
import { Prisma } from "@/app/generated/prisma/client";
import { QGetAllPositionsType } from "./staffType.Query";

export type TStaffTypeFormInput = z.infer<typeof StaffPositionFormInput>;
export type TStaffFormInput = z.infer<typeof StaffFormInput>;

export type TStaffPosition = Prisma.StaffPositionGetPayload<
  typeof QGetAllPositionsType
>;

export type TStaffPositionOptions = {
  id: number;
  name: string;
  isUnique: boolean;
  isFilled: boolean;
};
