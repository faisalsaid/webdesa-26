import z from "zod";
import { StaffPositionFormInput } from "./staffType.zod";
import { Prisma } from "@/app/generated/prisma/client";
import { QGetAllPositionsType } from "./staffType.Query";

export type TStaffTypeFormInput = z.infer<typeof StaffPositionFormInput>;

export type TStaffPosition = Prisma.StaffPositionGetPayload<
  typeof QGetAllPositionsType
>;
