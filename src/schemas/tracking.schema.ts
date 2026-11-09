import { z } from "zod";

export const trackingSchema = z.object({
  trackingNumber: z
    .string()
    .trim() // removes spaces at the start and end BEFORE checking length
    .min(1, "Enter a tracking number.")
    .max(30, "A tracking number has at most 30 characters.")
    .regex(/^[A-Za-z0-9-]+$/, "Use only letters, numbers and hyphens."),
});

// The TypeScript type comes FROM the schema, so they can never disagree.
export type TrackingFormValues = z.infer<typeof trackingSchema>;
