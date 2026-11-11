import { z } from "zod";

// Accepts Nigerian local numbers (08012345678) and international numbers (+2348012345678).
// Spaces and hyphens are ignored before testing.
const PHONE_PATTERN = /^(0[789][01]\d{8}|\+[1-9]\d{7,14})$/;

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(100, "Your name must be 100 characters or fewer.");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "Your email address is too long.")
  .pipe(z.email("Enter a valid email address, for example name@example.com."));

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Enter your phone number.")
  .max(20, "Your phone number is too long.")
  .refine((value) => PHONE_PATTERN.test(value.replace(/[\s-]/g, "")), {
    message:
      "Enter a valid phone number, for example 08012345678 or +2348012345678.",
  });
