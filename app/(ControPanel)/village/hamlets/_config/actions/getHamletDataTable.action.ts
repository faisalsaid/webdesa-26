"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { authorize } from "@/lib/auth-check";
import prisma from "@/lib/prisma";
import { QGetHamletsDataTable } from "../dto/hamlet.query";
import { THamletsDataTable } from "../dto/hamlet.type";

export type THamletDataTableResult = {
  success: boolean;
  message?: string;
  data?: THamletsDataTable;
};

interface Props {
  page?: number;
  pageSize?: number;
  search?: string;
}
export async function getHamletsDataTable({
  page = 1,
  pageSize = 10,
  search = "",
}: Props): Promise<THamletDataTableResult> {
  await authorize(["ADMIN", "OPERATOR"]);

  const skip = (page - 1) * pageSize;

  const where: Prisma.HamletWhereInput = search
    ? {
        OR: [
          { descriptions: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  try {
    const total = await prisma.hamlet.count({ where });
    const result = await prisma.hamlet.findMany({
      where,
      skip,
      ...QGetHamletsDataTable,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: {
        dataTable: result,
        meta: {
          page,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error, terjadi kesalahan",
    };
  }
}
