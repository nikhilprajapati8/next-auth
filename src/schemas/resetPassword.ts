import { loginUserSchema } from "./loginUserSchema";

export const passwordResetEmailSchema = loginUserSchema.pick({ email: true });

export const passwordResetSchema = loginUserSchema.pick({ password: true });
