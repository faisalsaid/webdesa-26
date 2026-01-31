-- CreateEnum
CREATE TYPE "StaffLevel" AS ENUM ('TOP', 'MIDDLEUP', 'MIDDLE', 'LOWER', 'STAFF', 'OTHER');

-- CreateTable
CREATE TABLE "StaffPosition" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" TEXT NOT NULL,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "positionType" "StaffLevel" NOT NULL DEFAULT 'OTHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT,
    "name" VARCHAR(100) NOT NULL,
    "imageUrl" VARCHAR(255),
    "imageKey" VARCHAR(255),
    "residentId" INTEGER,
    "positionTypeId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "parentStaffId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffHistory" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "positionTypeId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationUnit" (
    "id" SERIAL NOT NULL,
    "positionTypeId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "staffId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffPosition_slug_key" ON "StaffPosition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_urlId_key" ON "Staff"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUnit_staffId_key" ON "OrganizationUnit"("staffId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_parentStaffId_fkey" FOREIGN KEY ("parentStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHistory" ADD CONSTRAINT "StaffHistory_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHistory" ADD CONSTRAINT "StaffHistory_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OrganizationUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
