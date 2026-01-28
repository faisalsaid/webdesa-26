import z from "zod";
import {
  BloodTypeEnum,
  CitizenshipEnum,
  DisabilityTypeEnum,
  EducationEnum,
  FamilyRelationshipEnum,
  GenderEnum,
  MaritalStatusEnum,
  OccupationEnum,
  PopulationStatusEnum,
  ReligionEnum,
} from "./resident.enum";

export const ResidentInputSchema = z.object({
  id: z.number().optional(),
  urlId: z.string().optional(),
  nik: z.string().length(16, "NIK harus 16 digit"),
  fullName: z.string().min(1).max(100),

  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),

  gender: GenderEnum,

  birthPlace: z.string().optional().nullable(),
  birthDate: z.date().nullable().optional(),

  religion: ReligionEnum.optional().nullable(),
  education: EducationEnum.optional().nullable(),
  occupation: OccupationEnum.optional().nullable(),
  maritalStatus: MaritalStatusEnum.optional().nullable(),

  bloodType: BloodTypeEnum.optional().nullable(),
  disabilityType: DisabilityTypeEnum.optional().nullable(),
  citizenship: CitizenshipEnum.optional().nullable(),

  passportNumber: z.string().max(50).optional().nullable(),
  ethnicity: z.string().max(100).optional().nullable(),
  nationality: z.string().max(100).optional().nullable(),

  address: z.string().optional().nullable(),
  dusun: z.string().optional().nullable(),
  rw: z.string().optional().nullable(),
  rt: z.string().optional().nullable(),

  phone: z.string().optional().nullable(),
  email: z.email().optional().nullable(),

  populationStatus: PopulationStatusEnum.optional(),

  familyRelationship: FamilyRelationshipEnum.optional().nullable(),

  familyId: z.number().int().positive().optional().nullable(),

  isActive: z.boolean(),
});
