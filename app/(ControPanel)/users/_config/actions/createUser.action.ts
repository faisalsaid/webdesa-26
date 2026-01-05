"use server";

import prisma from "@/lib/prisma";
import { CreateUserSchema, TCreateUser } from "../dto/create-user.zod";
import { Prisma } from "@/app/generated/prisma/client";
import { createTransport } from "nodemailer";
import { authorize } from "@/lib/auth-check";
import { revalidatePath } from "next/cache";

type ActionResult =
  | { ok: true } // sukses
  | { ok: false; error: string } // gagal umum
  | { ok: false; fieldErrors: Record<string, string[]> }; // gagal validasi

export async function registerNewUser({
  data,
}: {
  data: TCreateUser;
}): Promise<ActionResult> {
  await authorize(["ADMIN"]);

  const parsed = CreateUserSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const { email, role } = parsed.data;

  try {
    // create new user
    await prisma.user.create({
      data: { email, role },
    });

    // create verification token

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // send email

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Desa" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your acount",
      html: `<p> Hello!, </p>
      <p> Your account has been created. Please verify your email:</p>
      <a href="${verifyUrl}">Verify Account</a>
      `,
    });

    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      // unique constraint
      return { ok: false, error: "The email has already been used." };
    }
    console.error("User creation failed:", err);
    return { ok: false, error: "Account creation failed. Please try again." };
  }
}
