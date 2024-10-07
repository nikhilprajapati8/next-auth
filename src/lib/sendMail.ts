import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `${domain}?token=${token}`;
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email",
      html: `<p>Click <a href=${confirmationLink}>here</a> to verify email</p>`,
    });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while sending email" };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/new-password?token=${token}`;
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your password",
      html: `<p>Click <a href=${resetLink}>here</a> to reset password</p>`,
    });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while sending email" };
  }
}
