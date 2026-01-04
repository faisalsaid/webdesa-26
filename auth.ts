import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET, // wajib
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 hari
    updateAge: 10 * 60, // refresh token tiap 10 menit
  },
  providers: [Credentials({})],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        return token;
      }

      // cek apakah user masih ada di DB
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub! },
        select: { id: true },
      });

      if (!existingUser) token.deleted = true;
      return token;
    },

    async session({ session, token }) {
      if (!token || token.deleted) {
        return { ...session, user: undefined }; // aman di React
      }

      session.user.id = token.sub!;
      session.user.role = token.role;
      return session;
    },
  },
});
