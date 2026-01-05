"use server";

import { auth } from "@/auth";
import prisma from "../prisma";
import { Prisma } from "@/app/generated/prisma/client";

const GetCurentUser = {
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    image: true,
    createdAt: true,
  },
} satisfies Prisma.UserFindFirstArgs;

export type TCurentUser = Prisma.UserGetPayload<typeof GetCurentUser>;

export default async function getCurrentUser() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    ...GetCurentUser,
  });

  return user;
}
