import { useQuery } from "@tanstack/react-query";
import { getShipment, getShipments } from "../services/shipmentService";

// Every key starts with "shipments", so one invalidation can refresh them all.
export const shipmentKeys = {
  all: ["shipments"] as const,
  list: () => ["shipments", "list"] as const,
  detail: (id: string) => ["shipments", "detail", id] as const,
};

export function useShipments() {
  return useQuery({
    queryKey: shipmentKeys.list(),
    queryFn: getShipments,
  });
}

// id can be undefined because the URL parameter might be missing.
export function useShipment(id: string | undefined) {
  return useQuery({
    queryKey: shipmentKeys.detail(id ?? ""),
    queryFn: () => getShipment(id as string),
    enabled: Boolean(id), // do not run until we actually have an id
    retry: false, // "not found" will not fix itself, so do not retry it
  });
}