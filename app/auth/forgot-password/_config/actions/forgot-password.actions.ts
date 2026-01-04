"use server";

import { sendPasswordResetEmail } from "@/app/auth/_config/mailer";
import { generatePasswordResetToken } from "@/app/auth/_config/tokens";
import prisma from "@/lib/prisma";

export async function forgotPasswordAction(email: string) {
  try {
    // Cari user (silent, jangan kasih tahu ke UI kalau tidak ketemu)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Hapus token lama user
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      // Generate token baru
      const { rawToken, tokenHash, expiresAt } = generatePasswordResetToken();

      // Simpan ke DB
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      // Kirim email reset password
      await sendPasswordResetEmail(user.email, rawToken, user.id);
    }

    // Return sukses generik (baik email ada atau tidak)
    return { success: true };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { success: true }; // tetap return generik
  }
}
