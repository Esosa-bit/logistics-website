import { z } from "zod";

// Digits, spaces, dashes, optional leading +. Loose on purpose; the backend has the final say.
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number");

export const customerEditSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter the customer's full name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  phone: phoneSchema,
});
export type CustomerEditValues = z.infer<typeof customerEditSchema>;
