import z from "zod";
import { StaffPositionFormInput } from "./staffType.zod";

export type TStaffTypeFormInput = z.infer<typeof StaffPositionFormInput>;
