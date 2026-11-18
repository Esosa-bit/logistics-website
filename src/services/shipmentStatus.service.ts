import type { Shipment, ShipmentStatus } from "../types/shipments";
import { STATUS_LABELS, getAllowedNextStatuses } from "../lib/shipmentStatus";

// ONE switch. Set to false when the real backend is ready.
// ": boolean" stops TypeScript treating the code after the if as unreachable.
const USE_MOCK: boolean = true;

const delay = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---------- MOCK DATA (delete when the backend is connected) ----------
const mockShipments: Shipment[] = [
  {
    id: "1",
    trackingNumber: "VL-2026-00125",
    customerName: "Ada Okafor",
    origin: "Lagos",
    destination: "Abuja",
    status: "booked",
    createdAt: "2026-11-16T09:00:00+01:00",
    history: [
      {
        status: "booked",
        timestamp: "2026-11-16T09:00:00+01:00",
        description: "Booking received",
      },
    ],
  },
  {
    id: "2",
    trackingNumber: "VL-2026-00126",
    customerName: "Tunde Bello",
    origin: "Abuja",
    destination: "Port Harcourt",
    status: "in_transit",
    riderName: "Musa Ibrahim",
    createdAt: "2026-11-14T10:00:00+01:00",
    history: [
      {
        status: "in_transit",
        timestamp: "2026-11-15T08:00:00+01:00",
        location: "Lokoja",
        description: "Left the Abuja hub",
      },
      {
        status: "picked_up",
        timestamp: "2026-11-14T15:00:00+01:00",
        location: "Abuja",
        description: "Collected from sender",
      },
      {
        status: "booked",
        timestamp: "2026-11-14T10:00:00+01:00",
        description: "Booking received",
      },
    ],
  },
  {
    id: "3",
    trackingNumber: "VL-2026-00127",
    customerName: "Chioma Eze",
    origin: "Enugu",
    destination: "Benin City",
    status: "delivered",
    createdAt: "2026-11-10T09:00:00+01:00",
    history: [
      {
        status: "delivered",
        timestamp: "2026-11-12T14:00:00+01:00",
        location: "Benin City",
        description: "Delivered to receiver",
      },
      {
        status: "booked",
        timestamp: "2026-11-10T09:00:00+01:00",
        description: "Booking received",
      },
    ],
  },
  {
    id: "4",
    trackingNumber: "VL-2026-00128",
    customerName: "Emeka Nwosu",
    origin: "Kano",
    destination: "Lagos",
    status: "exception",
    createdAt: "2026-11-13T09:00:00+01:00",
    history: [
      {
        status: "exception",
        timestamp: "2026-11-15T16:00:00+01:00",
        location: "Lagos",
        description: "Receiver not available",
      },
      {
        status: "out_for_delivery",
        timestamp: "2026-11-15T09:00:00+01:00",
        location: "Lagos",
        description: "With delivery rider",
      },
      {
        status: "booked",
        timestamp: "2026-11-13T09:00:00+01:00",
        description: "Booking received",
      },
    ],
  },
];
// ----------------------------------------------------------------------

// Returns the shipment, or null when nothing matches.
export async function searchShipment(
  trackingNumber: string,
): Promise<Shipment | null> {
  if (USE_MOCK) {
    await delay();
    const found = mockShipments.find(
      (s) => s.trackingNumber === trackingNumber,
    );
    return found ? { ...found, history: [...found.history] } : null;
  }

  // REAL: replace with a request to the backend (see Section 8).
  throw new Error("Real API not connected yet");
}

export interface UpdateStatusInput {
  shipmentId: string;
  status: ShipmentStatus;
  location?: string;
  description?: string;
}

export async function updateShipmentStatus(
  input: UpdateStatusInput,
): Promise<Shipment> {
  if (USE_MOCK) {
    await delay();
    const shipment = mockShipments.find((s) => s.id === input.shipmentId);
    if (!shipment) throw new Error("Shipment not found");

    // The mock behaves like a good backend: it rejects illegal moves.
    if (!getAllowedNextStatuses(shipment.status).includes(input.status)) {
      throw new Error(
        `Cannot move from "${STATUS_LABELS[shipment.status]}" to "${STATUS_LABELS[input.status]}"`,
      );
    }

    shipment.status = input.status;
    shipment.history = [
      {
        status: input.status,
        timestamp: new Date().toISOString(),
        location: input.location,
        // description is required by the shared TrackingEvent type
        description:
          input.description ??
          `Status changed to ${STATUS_LABELS[input.status]}`,
      },
      ...shipment.history, // newest first
    ];
    return { ...shipment, history: [...shipment.history] };
  }

  // REAL: replace with a request to the backend (see Section 8).
  throw new Error("Real API not connected yet");
}
