import z from "zod";

export const HamletInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Minimal 3 huruf"),
  slug: z.string(),
  descriptions: z.string().optional(),
});
