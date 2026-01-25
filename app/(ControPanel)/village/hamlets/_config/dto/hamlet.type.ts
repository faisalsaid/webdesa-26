import z from "zod";
import { HamletInputSchema } from "./hamlet.zod";

export type THamletFormInput = z.infer<typeof HamletInputSchema>;
