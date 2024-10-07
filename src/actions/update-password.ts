"use server";
import { getPasswordResetTokenbyToken } from "@/lib/getPasswordToken";
import { prisma } from "@/prisma";
import { passwordResetSchema } from "@/schemas/resetPassword";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function updatePassword(
  values: z.infer<typeof passwordResetSchema>,
  token?: string | null
) {
  try {
    if (!token) {
      throw new Error("Missing token");
    }

    const validatedfields = passwordResetSchema.safeParse(values);
    if (!validatedfields.success) {
      throw new Error("Invalid fields!");
    }

    const { password } = validatedfields.data;
    const existingToken = await getPasswordResetTokenbyToken(token);
    if (!existingToken) {
      throw new Error("Invalid token");
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      throw new Error("Token has expired");
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingUser) {
      throw new Error("Email doesn't exist!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return { message: "Password updated. Please log in" };
  } catch (error) {
    console.log("error from update password", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
