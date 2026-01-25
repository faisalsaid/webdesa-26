-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "Education" AS ENUM ('NONE', 'ELEMENTARY', 'JUNIOR_HIGH', 'SENIOR_HIGH', 'VOCATIONAL_HIGH', 'DIPLOMA_1', 'DIPLOMA_2', 'DIPLOMA_3', 'BACHELOR', 'MASTER', 'DOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('FARMER', 'FISHERMAN', 'TRADER', 'CIVIL_SERVANT', 'MILITARY', 'POLICE', 'PRIVATE_EMPLOYEE', 'TEACHER', 'STUDENT', 'UNIVERSITY_STUDENT', 'LABORER', 'HOUSEWIFE', 'UNEMPLOYED', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A', 'B', 'AB', 'O', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "PopulationStatus" AS ENUM ('PERMANENT', 'TEMPORARY', 'MOVED_OUT', 'DECEASED');

-- CreateEnum
CREATE TYPE "DisabilityType" AS ENUM ('NONE', 'PHYSICAL', 'VISUAL', 'HEARING', 'MENTAL', 'INTELLECTUAL', 'MULTIPLE', 'OTHER');

-- CreateEnum
CREATE TYPE "Citizenship" AS ENUM ('WNI', 'WNA');

-- CreateEnum
CREATE TYPE "FamilyRelationship" AS ENUM ('HEAD', 'SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'OTHER');

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "imageUrl" VARCHAR(255),
    "imageKey" VARCHAR(255),
    "gender" "Gender" NOT NULL,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "religion" "Religion",
    "education" "Education",
    "occupation" "Occupation",
    "maritalStatus" "MaritalStatus",
    "bloodType" "BloodType" DEFAULT 'UNKNOWN',
    "disabilityType" "DisabilityType" DEFAULT 'NONE',
    "citizenship" "Citizenship" DEFAULT 'WNI',
    "passportNumber" VARCHAR(50),
    "ethnicity" VARCHAR(100),
    "nationality" VARCHAR(100),
    "address" TEXT,
    "dusun" TEXT,
    "rw" TEXT,
    "rt" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "populationStatus" "PopulationStatus" NOT NULL DEFAULT 'PERMANENT',
    "familyRelationship" "FamilyRelationship",
    "familyId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "familyCardNumber" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "hamlet" VARCHAR(100) NOT NULL,
    "rw" VARCHAR(10) NOT NULL,
    "rt" VARCHAR(10) NOT NULL,
    "headOfFamilyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "residentId" INTEGER NOT NULL,
    "originAddress" TEXT,
    "originVillage" TEXT,
    "originDistrict" TEXT,
    "originRegency" TEXT,
    "originProvince" TEXT,
    "arrivalDate" TIMESTAMP(3),
    "purpose" TEXT,
    "stayType" TEXT,
    "isStillStaying" BOOLEAN NOT NULL DEFAULT true,
    "departureDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_urlId_key" ON "Resident"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_nik_key" ON "Resident"("nik");

-- CreateIndex
CREATE INDEX "Resident_familyId_idx" ON "Resident"("familyId");

-- CreateIndex
CREATE INDEX "Resident_dusun_rw_rt_idx" ON "Resident"("dusun", "rw", "rt");

-- CreateIndex
CREATE INDEX "Resident_populationStatus_idx" ON "Resident"("populationStatus");

-- CreateIndex
CREATE INDEX "Resident_isActive_idx" ON "Resident"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Family_urlId_key" ON "Family"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Family_familyCardNumber_key" ON "Family"("familyCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Family_headOfFamilyId_key" ON "Family"("headOfFamilyId");

-- CreateIndex
CREATE INDEX "Family_hamlet_rw_rt_idx" ON "Family"("hamlet", "rw", "rt");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_urlId_key" ON "Visitor"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_residentId_key" ON "Visitor"("residentId");

-- CreateIndex
CREATE INDEX "Visitor_arrivalDate_idx" ON "Visitor"("arrivalDate");

-- CreateIndex
CREATE INDEX "Visitor_departureDate_idx" ON "Visitor"("departureDate");

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_headOfFamilyId_fkey" FOREIGN KEY ("headOfFamilyId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
