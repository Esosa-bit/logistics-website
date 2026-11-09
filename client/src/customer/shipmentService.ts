import { mockCustomerShipments } from "./mockShipments";
import type { CustomerShipment } from "./customerTypes";

// Pauses for a moment, to imitate a real network request.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getMyShipments(): Promise<CustomerShipment[]> {
  await wait(500);
  return [...mockCustomerShipments]; // a copy, so callers cannot change the original list
}

export async function getMyShipment(id: string): Promise<CustomerShipment> {
  await wait(300);
  const found = mockCustomerShipments.find((shipment) => shipment.id === id);
  if (!found) {
    throw new Error("Shipment not found"); // the page will show a not-found state
  }
  return found;
}