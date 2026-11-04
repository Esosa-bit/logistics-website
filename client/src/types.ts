export const SHIPMENT_STATUSES = [
  "Pending", "Picked Up", "In Transit",
  "Out for Delivery", "Delivered", "Cancelled",
] as const;

// Build the type FROM the array so the two can never drift apart.
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export interface Shipment {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  staff: string | null; // null = not assigned yet
  date: string;         // ISO date "2026-10-29"
  amount: number;
}