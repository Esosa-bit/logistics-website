import type { Shipment } from "../types";

export const mockShipments: Shipment[] = [
  { id: "LT-1025", customer: "Sarah Williams", origin: "Lagos",
    destination: "Abuja", status: "In Transit", staff: "Emeka Obi",
    date: "2026-10-29", amount: 18500 },
  // add 5 more
];