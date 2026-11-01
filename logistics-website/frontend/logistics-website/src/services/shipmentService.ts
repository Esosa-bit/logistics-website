import { mockShipments } from "../mocks/shipment";
import type { Shipment } from "../types/shipment";

// Pauses for a moment, to imitate a real network request.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getShipments(): Promise<Shipment[]> {
  await wait(500);
  return [...mockShipments]; // a copy, so callers cannot change the original list
}

export async function getShipment(id: string): Promise<Shipment> {
  await wait(300);
  const found = mockShipments.find((shipment) => shipment.id === id);
  if (!found) {
    throw new Error("Shipment not found"); // the page will show a not-found state
  }
  return found;
}