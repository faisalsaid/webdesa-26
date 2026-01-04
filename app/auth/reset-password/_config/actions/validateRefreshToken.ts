"use server";

import prisma from "@/lib/prisma";
import crypto from "crypto";

// 🔹 Validasi token reset password
export async function validateResetToken(
  token: string,
  userId: string
): Promise<boolean> {
  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const record = await prisma.passwordResetToken.findFirst({
      where: {
        userId,
        tokenHash,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    return !!record;
  } catch (err) {
    console.error("validateResetToken error:", err);
    return false;
  }
}
