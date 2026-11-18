import type { ShipmentStatus } from "../types/shipments";

// Zod needs a real array at runtime (a type alone disappears when the code runs).
// Keep this in sync with ShipmentStatus in src/types/shipments.ts.
export const SHIPMENT_STATUSES = [
  "booked",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "exception",
] as const;

// Record<ShipmentStatus, string> makes TypeScript complain if a status is missing.
// The backend sends CODES; the UI shows LABELS.
export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  booked: "Booked",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  exception: "Failed Delivery",
};

// The normal delivery path. "exception" is not on it.
export const STATUS_ORDER: ShipmentStatus[] = [
  "booked",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

export function getAllowedNextStatuses(
  current: ShipmentStatus,
): ShipmentStatus[] {
  if (current === "delivered") return []; // final
  if (current === "exception") return ["out_for_delivery"]; // retry

  const forward = STATUS_ORDER.slice(STATUS_ORDER.indexOf(current) + 1); // skipping ahead is allowed
  const canFail = current === "in_transit" || current === "out_for_delivery";
  return canFail ? [...forward, "exception"] : forward;
}

// A reason is mandatory when a delivery fails
export function isReasonRequired(status: ShipmentStatus): boolean {
  return status === "exception";
}

// True when the admin jumps over one or more steps (we show a warning)
export function isSkippingSteps(
  current: ShipmentStatus,
  next: ShipmentStatus,
): boolean {
  const from = STATUS_ORDER.indexOf(current);
  const to = STATUS_ORDER.indexOf(next);
  if (from === -1 || to === -1) return false; // "exception" never counts as skipping
  return to - from > 1;
}
