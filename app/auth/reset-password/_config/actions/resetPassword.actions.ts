"use server";

import prisma from "@/lib/prisma";
import { hashSync } from "bcrypt-ts";
import crypto from "crypto";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 🔹 Reset password action
export async function resetPasswordAction(
  userId: string,
  token: string,
  newPassword: string
) {
  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // 🔹 Validasi token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        userId,
        tokenHash,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true }, // supaya dapat email user
    });

    if (!resetToken || !resetToken.user) {
      throw new Error("The token is invalid or has expired.");
    }

    // 🔹 Hash password baru
    const hashedPassword = hashSync(newPassword, 10);

    // 🔹 Update password user
    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });

    // 🔹 Tandai token sudah dipakai
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    });

    // 🔹 Hapus semua session user
    await prisma.session.deleteMany({
      where: { userId },
    });

    // 🔹 Kirim email notifikasi
    await transporter.sendMail({
      from: `"Support App" <${process.env.SMTP_USER}>`,
      to: resetToken.user.email,
      subject: "Your account password has been changed",
      text: `Hello ${
        resetToken.user.name || ""
      },\n\nYour account password has been successfully updated. If this wasn’t you, please reset your password immediately.`,
      html: `
        <p>Hello ${resetToken.user.name || "User"},</p>
        <p>Your account password has been <b>successfully updated</b>.</p>
        <p>If this wasn’t you, please <a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/auth/forgot-password">reset your password</a> immediately.</p>
        <br/>
        <p>Thank you,</p>
        <p><b>Support App</b></p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("resetPasswordAction error:", err);
    throw err;
  }
}
