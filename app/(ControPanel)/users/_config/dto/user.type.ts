import { Prisma } from "@/app/generated/prisma/client";

export const QGetUsers = {
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    image: true,
  },
} satisfies Prisma.UserFindFirstArgs;

export type TUsers = Prisma.UserGetPayload<typeof QGetUsers>;
