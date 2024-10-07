import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}
