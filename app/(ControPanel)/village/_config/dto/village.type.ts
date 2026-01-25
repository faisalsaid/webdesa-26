import { Prisma } from "@/app/generated/prisma/client";

export const QGetVillage = {
  select: {
    id: true,
    areaSize: true,
    areaUnit: true,
    borderEast: true,
    borderNorth: true,
    borderSouth: true,
    borderWest: true,
    description: true,
    districtCode: true,
    districtName: true,
    elevation: true,
    email: true,
    establishedYear: true,
    hamletCount: true,
    isActive: true,
    latitude: true,
    logoUrl: true,
    longitude: true,
    mission: true,
    officeAddress: true,
    officePhotoUrl: true,
    phone: true,
    populationTotal: true,
    postalCode: true,
    provinceCode: true,
    provinceName: true,
    regencyCode: true,
    regencyName: true,
    rtCount: true,
    rwCount: true,
    slogan: true,
    villageCode: true,
    villageName: true,
    vision: true,
    website: true,
  },
} satisfies Prisma.VillageConfigFindFirstArgs;

// export type TVillage = Prisma.VillageConfigGetPayload<typeof QGetVillage>;

export type TVillage = Omit<
  Prisma.VillageConfigGetPayload<typeof QGetVillage>,
  "latitude" | "longitude"
> & {
  latitude: string | null;
  longitude: string | null;
};
