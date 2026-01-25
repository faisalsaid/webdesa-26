import z from "zod";
import { villageConfigSchema } from "./village.zod";

export type TVillageInput = z.infer<typeof villageConfigSchema>;
