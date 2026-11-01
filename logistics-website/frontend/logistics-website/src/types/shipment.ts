import type { DeliveryType, ShipmentStatus } from "../constants/shipment";

export interface StatusHistoryEntry {
  status: ShipmentStatus;
  note?: string; // the ? means optional
  createdAt: string; // ISO date text
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
  packageDescription: string;
  weightKg: number;
  deliveryType: DeliveryType;
  status: ShipmentStatus;
  priceMinor: number; // whole number of minor units, example: 350000
  paymentStatus: "unpaid" | "paid";
  createdAt: string;
  history: StatusHistoryEntry[];
}