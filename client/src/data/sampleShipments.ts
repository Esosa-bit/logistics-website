import type { Shipment } from "../hooks/useShipments";

export const SAMPLE_SHIPMENTS: Shipment[] = [
  { id: "VL-1008", destination: "Enugu", status: "Pending", date: "2026-10-31" },
  { id: "VL-1007", destination: "Kano", status: "In Transit", date: "2026-10-31" },
  { id: "VL-1006", destination: "Ibadan", status: "In Transit", date: "2026-10-30" },
  { id: "VL-1005", destination: "Lagos", status: "Delivered", date: "2026-10-30" },
  { id: "VL-1004", destination: "Benin City", status: "Delivered", date: "2026-10-29" },
  { id: "VL-1003", destination: "Port Harcourt", status: "Pending", date: "2026-10-28" },
  { id: "VL-1002", destination: "Abuja", status: "Delivered", date: "2026-10-27" },
  { id: "VL-1001", destination: "Kaduna", status: "In Transit", date: "2026-10-26" },
];