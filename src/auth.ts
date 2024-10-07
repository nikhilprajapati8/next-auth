import NextAuth from "next-auth";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // newUser: "/register",
    // error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      console.log({ session: token });

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const userExists = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (!userExists) return token;

      token.role = userExists.role;
      return token;
    },
  },
  ...authConfig,
});
