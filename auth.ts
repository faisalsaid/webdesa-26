import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { loginSchema } from "./app/auth/login/_config/type/login.zod";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET, // wajib
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 hari
    updateAge: 10 * 60, // refresh token tiap 10 menit
  },
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) throw new Error("No user found");

        const match = compareSync(password, user.hashedPassword);
        if (!match) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashedPassword, ...cleanUser } = user;
        return cleanUser;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Saat login pertama kali, pasang role ke token
      if (user) {
        token.role = user.role;
        return token;
      }

      // SETIAP KALI Sesi divalidasi (karena updateAge: 10 menit):
      // Ambil data user terbaru dari DB untuk sinkronisasi role
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true }, // Kita hanya butuh role
        });

        // JIKA User dihapus atau ROLE BERUBAH dari apa yang ada di token
        if (!dbUser) {
          token.forceLogout = true;
        } else if (dbUser.role !== token.role) {
          // Opsi A: Update token secara otomatis ke role baru
          // token.role = dbUser.role;

          // Opsi B: Paksa logout jika role berubah (sesuai permintaan Anda)
          token.forceLogout = true;
        }
      } catch (error) {
        console.error("Error verifying user role:", error);
      }

      return token;
    },

    async session({ session, token }) {
      // Jika terdeteksi perubahan role, kosongkan session
      if (token.forceLogout) {
        // Kita paksa expires menjadi masa lalu
        return {
          ...session,
          user: { id: "", email: "", role: "" }, // Return dummy data
          expires: "1970-01-01T00:00:00.000Z",
        };
      }

      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role ?? "USER";
      }

      return session;
    },
  },
});
