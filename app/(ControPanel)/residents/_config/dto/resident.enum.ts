import {
  BloodType,
  Citizenship,
  DisabilityType,
  Education,
  FamilyRelationship,
  MaritalStatus,
  Occupation,
  PopulationStatus,
  Religion,
} from "@/app/generated/prisma/enums";

export const ReligionLabels: Record<Religion, string> = {
  ISLAM: "Islam",
  CHRISTIAN: "Kristen",
  CATHOLIC: "Katolik",
  HINDU: "Hindu",
  BUDDHIST: "Budha",
  CONFUCIAN: "Konghucu",
  OTHER: "Kepercayaan",
};

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

export const MaritalStatusLabels: Record<MaritalStatus, string> = {
  SINGLE: "Belum Menikah",
  MARRIED: "Menikah",
  DIVORCED: "Cerai Hidup",
  WIDOWED: "Cerai Mati",
};

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

export const BloodTypeLabels: Record<BloodType, string> = {
  A: "A",
  B: "B",
  AB: "AB",
  O: "O",
  UNKNOWN: "Tidak Diketahui",
};

export const PopulationStatusLabels: Record<PopulationStatus, string> = {
  PERMANENT: "Warga Tetap",
  TEMPORARY: "Pendatang Sementara",
  MOVED_OUT: "Sudah Pindah",
  DECEASED: "Meninggal Dunia",
};

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

export const CitizenshipLabels: Record<Citizenship, string> = {
  WNI: "Warga Negara Indonesia",
  WNA: "Warga Negara Asing",
};

export const FamilyRelationshipLabels: Record<FamilyRelationship, string> = {
  HEAD: "Kepala Keluarga",
  SPOUSE: "Suami / Istri",
  CHILD: "Anak",
  PARENT: "Orang Tua",
  SIBLING: "Saudara",
  OTHER: "Lainnya",
};
