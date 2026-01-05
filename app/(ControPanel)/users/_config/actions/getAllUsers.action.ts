"use server";

import prisma from "@/lib/prisma";
import { QGetUsers } from "../dto/user.type";
import { Prisma } from "@/app/generated/prisma/client";
import { authorize } from "@/lib/auth-check";

interface Props {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getAllUser({
  page = 1,
  pageSize = 10,
  search = "",
}: Props) {
  await authorize(["ADMIN", "OPERATOR"]);

  const skip = (page - 1) * pageSize;

  const where: Prisma.UserWhereInput = search
    ? {
        OR: [
          {
            name: { contains: search, mode: "insensitive" },
          },
          {
            email: { contains: search, mode: "insensitive" },
          },
        ],
      }
    : {};

  const [total, users] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      ...QGetUsers,
    }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      totalPage: Math.ceil(total / pageSize),
    },
  };
}
