import { useQuery } from "@tanstack/react-query";
import { getMyShipment, getMyShipments } from "./shipmentService";

// Every key starts with ["customer", "shipments"], so one refresh can cover them all.
export const customerShipmentKeys = {
  all: ["customer", "shipments"] as const,
  list: () => ["customer", "shipments", "list"] as const,
  detail: (id: string) => ["customer", "shipments", "detail", id] as const,
};

export function useMyShipments() {
  return useQuery({
    queryKey: customerShipmentKeys.list(),
    queryFn: getMyShipments,
  });
}

// id can be undefined, because the URL parameter might be missing.
export function useMyShipment(id: string | undefined) {
  return useQuery({
    queryKey: customerShipmentKeys.detail(id ?? ""),
    queryFn: () => getMyShipment(id as string),
    enabled: Boolean(id), // do not run until we actually have an id
    retry: false, // "not found" will not fix itself, so do not retry it
  });
}