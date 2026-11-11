import type { PublicShipment } from "../types/shipments";

// DEMONSTRATION DATA ONLY. Not a real shipment. Every value below is invented.
// Delete this file when the real tracking API exists.

export const DEMO_TRACKING_NUMBER = "VL-2026-00125";
export const DEMO_ERROR_NUMBER = "VL-ERROR"; // reserved value that simulates a network failure

export const demoShipment: PublicShipment = {
  trackingNumber: DEMO_TRACKING_NUMBER,
  status: "in_transit",
  origin: "Lagos",
  destination: "Abuja",
  estimatedDelivery: "2026-11-05", // sample date
  events: [
    {
      status: "booked",
      timestamp: "2026-10-27T09:15:00+01:00",
      location: "Lagos",
      description: "Shipment booked.",
    },
    {
      status: "picked_up",
      timestamp: "2026-10-27T14:40:00+01:00",
      location: "Lagos",
      description: "Shipment collected from the sender.",
    },
    {
      status: "in_transit",
      timestamp: "2026-10-28T08:05:00+01:00",
      location: "Sample transit hub",
      description: "Shipment is on its way to the destination city.",
    },
  ],
};
