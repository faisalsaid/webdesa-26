import { Prisma } from "@/app/generated/prisma/client";

export const QGetUsers = {
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    image: true,
    createdAt: true,
  },
} satisfies Prisma.UserFindFirstArgs;

export type TUser = Prisma.UserGetPayload<typeof QGetUsers>;
