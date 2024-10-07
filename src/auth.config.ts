import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginUserSchema } from "./schemas/loginUserSchema";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
export default {
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedSchema = loginUserSchema.safeParse(credentials);

        if (validatedSchema.success) {
          const { email, password } = validatedSchema.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user?.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
