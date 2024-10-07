"use server";

import { getVerificationTokenByToken } from "@/lib/getVerificationToken";
import { prisma } from "@/prisma";

export async function newVerification(token: string) {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
      throw new Error("Invalid token");
    }
    const hasExpired = existingToken?.expires < new Date();

    if (hasExpired) {
      throw new Error("Token has expired try logging in to get a new token");
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!userExists) {
      throw new Error("Email doesn't exist!");
    }

    await prisma.user.update({
      where: {
        email: existingToken.email,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return { message: "Email verified successfully. Please log in" };
  } catch (error) {
    console.log(error, "error from verification");
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
