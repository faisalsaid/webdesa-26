"use server";

import { authorize } from "@/lib/auth-check";
import { TStaffDataTableResult } from "./staff.type";
import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { QGetStaffDataTable } from "./staff.query";

type Result = {
  success: boolean;
  message?: string;
  data?: TStaffDataTableResult;
};

interface Props {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getStaffDataTable({
  page = 1,
  pageSize = 10,
  search = "",
}: Props): Promise<Result> {
  await authorize(["ADMIN", "OPERATOR"]);
  const skip = (page - 1) * pageSize;

  const where: Prisma.StaffWhereInput = search
    ? {
        OR: [{ name: { contains: search, mode: "insensitive" } }],
      }
    : {};

  try {
    const total = await prisma.staff.count({ where });
    const staff = await prisma.staff.findMany({
      where,
      skip,
      ...QGetStaffDataTable,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: {
        dataTable: staff,
        meta: {
          page,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Server error, terjadi masalah!",
    };
  }
}
