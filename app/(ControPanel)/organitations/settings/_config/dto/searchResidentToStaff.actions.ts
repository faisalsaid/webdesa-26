"use server";

import prisma from "@/lib/prisma";

export async function searchResidentToStaff(query: string) {
  return prisma.resident.findMany({
    where: {
      fullName: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      fullName: true,
      nik: true,
    },
    take: 10,
  });
}
