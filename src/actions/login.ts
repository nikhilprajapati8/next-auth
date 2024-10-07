"use server";
// import bcrypt from "bcryptjs";
import { z } from "zod";
import { loginUserSchema } from "@/schemas/loginUserSchema";
import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { prisma } from "@/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/sendMail";

export async function login(values: z.infer<typeof loginUserSchema>) {
  try {
    const validatedLoginSchema = loginUserSchema.safeParse(values);
    if (!validatedLoginSchema.success) {
      throw new Error("Invalid inputs");
    }

    const { email, password } = validatedLoginSchema.data;
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      throw new Error("Invalid credentials");
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(existingUser.email, verificationToken.token);
      return {
        message:
          "A confirmation email has been sent again. Please verify your email to proceed.",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });

    return { message: "Login successfull" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials" };
      }
    } else if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
    throw error;
  }
}
