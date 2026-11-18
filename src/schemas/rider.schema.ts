import { z } from "zod";
import { phoneSchema } from "./customer.schema";

export const riderSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter the rider's full name")
    .max(100, "Name is too long"),
  phone: phoneSchema,
});
export type RiderFormValues = z.infer<typeof riderSchema>;
