import { Prisma } from "@/app/generated/prisma/client";

export const QGetVillage = {} satisfies Prisma.VillageConfigFindFirstArgs;

export type TVillage = Prisma.VillageConfigGetPayload<typeof QGetVillage>;
