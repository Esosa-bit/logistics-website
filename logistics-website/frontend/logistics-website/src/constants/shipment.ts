// The only place status names are defined. Import from here everywhere.
export const SHIPMENT_STATUSES = [
  "pending",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const; // "as const" locks the exact words instead of a plain string[]

// Turns the list above into a type: "pending" | "picked_up" | ...
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const DELIVERY_TYPES = ["standard", "express"] as const;
export type DeliveryType = (typeof DELIVERY_TYPES)[number];

// Friendly text for the screen. Record<...> forces a label for EVERY status.
export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  pending: "Pending",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

// Only these statuses can be edited or cancelled (our decision: pending only).
export const EDITABLE_STATUSES: ShipmentStatus[] = ["pending"];

// "Active" means the shipment is still on its way.
export const ACTIVE_STATUSES: ShipmentStatus[] = [
  "pending",
  "picked_up",
  "in_transit",
  "out_for_delivery",
];