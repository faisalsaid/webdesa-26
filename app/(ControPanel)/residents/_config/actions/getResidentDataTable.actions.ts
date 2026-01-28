"use server";

import { authorize } from "@/lib/auth-check";
import {
  QGetResidentsDataTable,
  TResidentsDataTableResult,
} from "../dto/resident.type";
import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

type Result = {
  success: boolean;
  message?: string;
  data?: TResidentsDataTableResult;
};

interface Props {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getResidentsDataTable({
  page = 1,
  pageSize = 10,
  search = "",
}: Props): Promise<Result> {
  await authorize(["ADMIN", "OPERATOR"]);
  const skip = (page - 1) * pageSize;

  const where: Prisma.ResidentWhereInput = search
    ? {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { nik: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  try {
    const total = await prisma.resident.count({ where });
    const residens = await prisma.resident.findMany({
      where,
      skip,
      ...QGetResidentsDataTable,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: {
        dataTable: residens,
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
      message: "Server error, something wrong!",
    };
  }
}
