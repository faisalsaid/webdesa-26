import {
  BloodType,
  Citizenship,
  DisabilityType,
  Education,
  FamilyRelationship,
  Gender,
  MaritalStatus,
  Occupation,
  PopulationStatus,
  Religion,
} from "@/app/generated/prisma/enums";
import { createEnumHelpers } from "@/lib/helper/createEnumHelper";

// GENDER
export const GenderLabels: Record<Gender, string> = {
  MALE: "Laki-laki",
  FEMALE: "Perempuan",
};

export const {
  zodEnum: GenderEnum,
  options: genderOptions,
  labelMap: genderLabelMap,
} = createEnumHelpers(Gender, GenderLabels);

// RELGION
export const ReligionLabels: Record<Religion, string> = {
  ISLAM: "Islam",
  CHRISTIAN: "Kristen",
  CATHOLIC: "Katolik",
  HINDU: "Hindu",
  BUDDHIST: "Budha",
  CONFUCIAN: "Konghucu",
  OTHER: "Kepercayaan",
};

export const {
  zodEnum: ReligionEnum,
  options: relegionOptions,
  labelMap: relegionLabelMap,
} = createEnumHelpers(Religion, ReligionLabels);

// EDUCATION
export const EducationLabels: Record<Education, string> = {
  NONE: "Tidak Sekolah",
  ELEMENTARY: "SD",
  JUNIOR_HIGH: "SMP",
  SENIOR_HIGH: "SMA",
  VOCATIONAL_HIGH: "SMK",
  DIPLOMA_1: "D1",
  DIPLOMA_2: "D2",
  DIPLOMA_3: "D3",
  BACHELOR: "S1",
  MASTER: "S2",
  DOCTORATE: "S3",
  OTHER: "Lainya",
};

export const {
  zodEnum: EducationEnum,
  options: educationOptions,
  labelMap: educationLabelMap,
} = createEnumHelpers(Education, EducationLabels);

// MARITALS
export const MaritalStatusLabels: Record<MaritalStatus, string> = {
  SINGLE: "Belum Menikah",
  MARRIED: "Menikah",
  DIVORCED: "Cerai Hidup",
  WIDOWED: "Cerai Mati",
};

export const {
  zodEnum: MaritalStatusEnum,
  options: maritalStatusOptions,
  labelMap: maritalStatusLabelMap,
} = createEnumHelpers(MaritalStatus, MaritalStatusLabels);

// OCCUPATIONS
export const OccupationLabels: Record<Occupation, string> = {
  FARMER: "Petani",
  FISHERMAN: "Nelayan",
  TRADER: "Pedagang",
  CIVIL_SERVANT: "PNS",
  MILITARY: "TNI",
  POLICE: "Polri",
  PRIVATE_EMPLOYEE: "Karyawan Swasta",
  TEACHER: "Guru",
  STUDENT: "Pelajar",
  UNIVERSITY_STUDENT: "Mahasiswa",
  LABORER: "Buruh",
  HOUSEWIFE: "Ibu Rumah Tangga",
  UNEMPLOYED: "Tidak Bekerja",
  OTHER: "Lainnya",
};

export const {
  zodEnum: OccupationEnum,
  options: occupationOptions,
  labelMap: occupationLabelMap,
} = createEnumHelpers(Occupation, OccupationLabels);

// BLOOD TYPES
export const BloodTypeLabels: Record<BloodType, string> = {
  A: "A",
  B: "B",
  AB: "AB",
  O: "O",
  UNKNOWN: "Tidak Diketahui",
};

export const {
  zodEnum: BloodTypeEnum,
  options: bloodTypeOptions,
  labelMap: bloodTypeLabelMap,
} = createEnumHelpers(BloodType, BloodTypeLabels);

// POPULATION SATATUS
export const PopulationStatusLabels: Record<PopulationStatus, string> = {
  PERMANENT: "Warga Tetap",
  TEMPORARY: "Pendatang Sementara",
  MOVED_OUT: "Sudah Pindah",
  DECEASED: "Meninggal Dunia",
};

export const {
  zodEnum: PopulationStatusEnum,
  options: populationStatusOptions,
  labelMap: populationStatusLabelMap,
} = createEnumHelpers(PopulationStatus, PopulationStatusLabels);

// DISABILITY
export const DisabilityTypeLabels: Record<DisabilityType, string> = {
  NONE: "Tidak Ada",
  PHYSICAL: "Disabilitas Fisik",
  VISUAL: "Tunanetra",
  HEARING: "Tunarungu / Tunawicara",
  MENTAL: "Disabilitas Mental / Psikososial",
  INTELLECTUAL: "Disabilitas Intelektual",
  MULTIPLE: "Disabilitas Ganda",
  OTHER: "Lainnya",
};

export const {
  zodEnum: DisabilityTypeEnum,
  options: disabilityTypeOptions,
  labelMap: disabilityTypeLabelMap,
} = createEnumHelpers(DisabilityType, DisabilityTypeLabels);

// CITICZEN
export const CitizenshipLabels: Record<Citizenship, string> = {
  WNI: "Warga Negara Indonesia",
  WNA: "Warga Negara Asing",
};

export const {
  zodEnum: CitizenshipEnum,
  options: citizenshipOptions,
  labelMap: citizenshipLabelMap,
} = createEnumHelpers(Citizenship, CitizenshipLabels);

// FAMILY RELATIONS
export const FamilyRelationshipLabels: Record<FamilyRelationship, string> = {
  HEAD: "Kepala Keluarga",
  SPOUSE: "Suami / Istri",
  CHILD: "Anak",
  PARENT: "Orang Tua",
  SIBLING: "Saudara",
  OTHER: "Lainnya",
};

export const {
  zodEnum: FamilyRelationshipEnum,
  options: familyRelationshipOptions,
  labelMap: familyRelationshipLabelMap,
} = createEnumHelpers(FamilyRelationship, FamilyRelationshipLabels);
