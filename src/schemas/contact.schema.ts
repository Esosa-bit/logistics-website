import { z } from "zod";
import { emailSchema, fullNameSchema, phoneSchema } from "./common.schema";

export const contactSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject of at least 3 characters.")
    .max(120, "The subject must be 120 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters so we can understand your request.")
    .max(2000, "The message must be 2000 characters or fewer."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const MESSAGE_MAX_LENGTH = 2000;
