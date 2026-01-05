"use server";

import { auth } from "@/auth";
import prisma from "../prisma";

export default async function getCurrentUser() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  return user;
}
