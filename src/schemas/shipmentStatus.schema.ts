import { z } from "zod";
import { SHIPMENT_STATUSES, isReasonRequired } from "../lib/shipmentStatus";

export const shipmentSearchSchema = z.object({
  trackingNumber: z
    .string()
    .trim()
    .min(1, "Enter a tracking number")
    .max(40, "Tracking number is too long"),
});
export type ShipmentSearchValues = z.infer<typeof shipmentSearchSchema>;

export const statusUpdateSchema = z
  .object({
    status: z.enum(SHIPMENT_STATUSES),
    location: z.string().trim().max(100, "Maximum 100 characters"),
    description: z.string().trim().max(500, "Maximum 500 characters"),
  })
  // Cross-field rule: some statuses need a reason
  .superRefine((data, ctx) => {
    if (isReasonRequired(data.status) && data.description === "") {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "A reason is required for this status",
      });
    }
  });
export type StatusUpdateValues = z.infer<typeof statusUpdateSchema>;
