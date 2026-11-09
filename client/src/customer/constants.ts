import type { ShipmentStatus } from "../types";

export const DELIVERY_TYPES = ["Standard", "Express"] as const;
export type DeliveryType = (typeof DELIVERY_TYPES)[number];

// Only these statuses can still be edited or cancelled by the customer.
export const EDITABLE_STATUSES: ShipmentStatus[] = ["Pending"];

// "Active" means the shipment is still on its way.
export const ACTIVE_STATUSES: ShipmentStatus[] = [
  "Pending",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
];