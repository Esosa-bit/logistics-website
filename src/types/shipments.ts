export type ShipmentStatus =
  | "booked"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "exception";

export type TrackingEvent = {
  status: ShipmentStatus;
  timestamp: string; // ISO date-time, e.g. "2026-10-27T09:15:00+01:00"
  location?: string;
  description: string;
};

// ONLY these fields may ever be shown to the public.
// There is deliberately no phone, email, street address or internal notes field,
// so the UI cannot display them even by accident.
export type PublicShipment = {
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string; // city only
  destination: string; // city only
  estimatedDelivery?: string; // ISO date
  events: TrackingEvent[]; // oldest first
};

export type TrackingResult =
  | { kind: "found"; shipment: PublicShipment }
  | { kind: "not_found" };

export interface Shipment {
  id: string;
  trackingNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  riderName?: string;
  createdAt: string;
  history: TrackingEvent[]; // newest first
}

// Used by Manage Customers and Manage Riders
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: "active" | "suspended";
  createdAt: string;
}

export interface Rider {
  id: string;
  fullName: string;
  phone: string;
  status: "active" | "inactive";
}
