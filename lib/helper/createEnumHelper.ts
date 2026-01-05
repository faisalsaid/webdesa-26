import { z } from "zod";

/**
 * Buat ZodEnum, options, dan labels dari enum Prisma
 */
export function createEnumHelpers<T extends string>(
  enumObj: Record<string, T>,
  labels: Record<T, string>
) {
  // Zod enum
  const zodEnum = z.enum(Object.values(enumObj) as [T, ...T[]]);

  // Options untuk select/input
  const options = Object.values(enumObj).map((value) => ({
    value,
    label: labels[value],
  }));

  // Record label mapping
  const labelMap: Record<T, string> = { ...labels };

  return { zodEnum, options, labelMap };
}
