import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "username can't be lesser than 3 characters" })
    .max(30, { message: "username can't be greater than 30 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "password can't be lesser than 6 characters" }),
});
