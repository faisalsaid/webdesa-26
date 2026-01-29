import { Prisma } from "@/app/generated/prisma/client";

export const QGetResidentsDataTable = {
  select: {
    id: true,
    nik: true,
    urlId: true,
    fullName: true,
    imageUrl: true,
    gender: true,
    birthDate: true,
    populationStatus: true,
    createdAt: true,
    updatedAt: true,
    family: {
      select: {
        id: true,
        urlId: true,
        familyCardNumber: true,
      },
    },
  },
} satisfies Prisma.ResidentFindManyArgs;

export const QGetResidentDetails = {} satisfies Prisma.ResidentFindFirstArgs;
