"use server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/prisma";
import { registerUserSchema } from "@/schemas/registerUser";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/sendMail";

export async function register(values: z.infer<typeof registerUserSchema>) {
  try {
    const registerSchema = registerUserSchema.safeParse(values);
    if (!registerSchema.success) {
      throw new Error("Invalid inputs");
    }

    const { email, password, name } = registerSchema.data;
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return { message: "Confirmation email sent successfully" };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
