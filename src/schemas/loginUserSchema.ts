import { registerUserSchema } from "./registerUser";

export const loginUserSchema = registerUserSchema.omit({
  name: true,
});
