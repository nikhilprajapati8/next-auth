import { prisma } from "@/prisma";

export async function getPasswordResetTokenbyToken(token: string) {
  try {
    const passwordResetToken = await prisma.passwordToken.findFirst({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
}
export async function getPasswordResetTokenbyEmail(email: string) {
  try {
    const passwordResetToken = await prisma.passwordToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
}
