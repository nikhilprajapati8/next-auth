import { prisma } from "@/prisma";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./getVerificationToken";
import { getPasswordResetTokenbyEmail } from "./getPasswordToken";
export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingVerificationToken = await getVerificationTokenByEmail(email);
  if (existingVerificationToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingVerificationToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return verificationToken;
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenbyEmail(email);

  if (existingToken) {
    await prisma.passwordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await prisma.passwordToken.create({
    data: {
      token,
      expires,
      email,
    },
  });
  return passwordResetToken;
}
