"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function providerLogin(provider: "google" | "github") {
  try {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { message: "Login successfull" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      if (error.type === "OAuthAccountNotLinked") {
        return { error: "Email is already in use with another provider" };
      } else if (error.type === "OAuthCallbackError") {
        return { error: "Email is already in use with another provider" };
      } else {
        return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
