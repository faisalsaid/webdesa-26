"use server";

import { auth } from "@/auth";
import prisma from "./prisma";

export async function serviceAuthorization<
  T extends Record<string, readonly string[]>
>(policy: T, actionName: keyof T) {
  const session = await auth();

  const curentUser = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  if (!session) throw new Error("Unauthorized");

  if (!curentUser) throw new Error("user not exist");

  const role = curentUser.role;
  const allowedRoles = policy[actionName];

  if (!allowedRoles.includes(role)) {
    throw new Error("Forbidden");
  }
}
