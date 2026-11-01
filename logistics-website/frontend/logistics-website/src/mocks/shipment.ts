import type { Shipment } from "../types/shipment";

export const mockShipments: Shipment[] = [
  {
    id: "s-1001",
    trackingNumber: "LGS-1001",
    pickupAddress: "12 Sample Street, Demo City",
    deliveryAddress: "48 Example Road, Test Town",
    receiverName: "Test Receiver One",
    receiverPhone: "0800 000 0001",
    packageDescription: "Box of sample documents",
    weightKg: 2.5,
    deliveryType: "standard",
    status: "pending",
    priceMinor: 350000,
    paymentStatus: "unpaid",
    createdAt: "2026-10-28T09:15:00Z",
    history: [
      { status: "pending", note: "Booking received", createdAt: "2026-10-28T09:15:00Z" },
    ],
  },
  {
    id: "s-1002",
    trackingNumber: "LGS-1002",
    pickupAddress: "5 Demo Avenue, Sample City",
    deliveryAddress: "90 Test Lane, Example Town",
    receiverName: "Test Receiver Two",
    receiverPhone: "0800 000 0002",
    packageDescription: "Small parcel of sample clothes",
    weightKg: 1.2,
    deliveryType: "express",
    status: "delivered",
    priceMinor: 520000,
    paymentStatus: "paid",
    createdAt: "2026-10-20T08:00:00Z",
    history: [
      { status: "pending", note: "Booking received", createdAt: "2026-10-20T08:00:00Z" },
      { status: "picked_up", createdAt: "2026-10-20T11:30:00Z" },
      { status: "in_transit", createdAt: "2026-10-20T15:00:00Z" },
      { status: "out_for_delivery", createdAt: "2026-10-21T08:45:00Z" },
      { status: "delivered", note: "Handed to receiver", createdAt: "2026-10-21T10:20:00Z" },
    ],
  },
];