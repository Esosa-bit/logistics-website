import {
  DEMO_ERROR_NUMBER,
  DEMO_TRACKING_NUMBER,
  demoShipment,
} from "../mocks/trackingData";
import type { TrackingResult } from "../types/shipments";

/**
 * MOCK SERVICE. No server is contacted and nothing here is real tracking data.
 *
 * When the backend contract is agreed, replace the body of this function with a
 * real request. The page that calls it does not need to change, because it only
 * depends on the TrackingResult type.
 */
export async function trackShipment(
  trackingNumber: string,
): Promise<TrackingResult> {
  // Pretend the network takes a moment so the loading state is visible.
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalised = trackingNumber.trim().toUpperCase();

  if (normalised === DEMO_ERROR_NUMBER) {
    throw new Error("Simulated network failure"); // lets you see the error state
  }
  if (normalised === DEMO_TRACKING_NUMBER) {
    return { kind: "found", shipment: demoShipment };
  }
  return { kind: "not_found" };
}
