import { z } from "zod";
import { emailSchema, fullNameSchema, phoneSchema } from "./common.schema";

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;

export const registerSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    phone: phoneSchema,

    // Passwords are NOT trimmed: spaces are allowed because they are part of what the person typed.
    // No "must contain a symbol" rules: length matters more than complexity, and
    // arbitrary rules push people towards predictable passwords like "Password1!".
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Use at least ${PASSWORD_MIN_LENGTH} characters.`,
      )
      .max(
        PASSWORD_MAX_LENGTH,
        `Use ${PASSWORD_MAX_LENGTH} characters or fewer.`,
      ),

    confirmPassword: z
      .string()
      .min(1, "Enter your password again to confirm it."),
  })
  // This rule looks at TWO fields, so it sits on the whole object.
  // `path` makes the error appear under the confirm field.
  .refine((values) => values.password === values.confirmPassword, {
    message: "The two passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
