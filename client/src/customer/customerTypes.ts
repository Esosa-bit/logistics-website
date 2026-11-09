import type { Shipment, ShipmentStatus } from "../types";
import type { DeliveryType } from "./constants";

export interface StatusHistoryEntry {
  status: ShipmentStatus;
  note?: string; // the ? means optional
  createdAt: string; // ISO date text
}

// The team's Shipment plus what the customer pages need.
// "id" doubles as the tracking number, for example "VL-1001".
export interface CustomerShipment extends Shipment {
  receiverName: string;
  receiverPhone: string;
  packageDescription: string;
  weightKg: number;
  deliveryType: DeliveryType;
  paymentStatus: "Unpaid" | "Paid";
  history: StatusHistoryEntry[];
}