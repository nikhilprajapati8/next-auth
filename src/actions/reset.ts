"use server";
import { sendPasswordResetEmail } from "@/lib/sendMail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { prisma } from "@/prisma";
import { passwordResetEmailSchema } from "@/schemas/resetPassword";
import { z } from "zod";

export async function resetPassword(
  values: z.infer<typeof passwordResetEmailSchema>
) {
  try {
    const validatedEmail = passwordResetEmailSchema.safeParse(values);
    if (!validatedEmail.success) {
      throw new Error("Invalid email");
    }
    const { email } = validatedEmail.data;
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("Email not found");
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return { message: "Reset email sent!" };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
