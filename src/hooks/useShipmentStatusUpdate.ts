import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  searchShipment,
  updateShipmentStatus,
} from "../services/shipmentStatus.service";

// The query key is the cache label. Same key = same cached data.
export function useShipmentSearch(trackingNumber: string) {
  return useQuery({
    queryKey: ["shipment", trackingNumber],
    queryFn: () => searchShipment(trackingNumber),
    enabled: trackingNumber.length > 0, // don't fetch until the admin searches
  });
}

export function useUpdateShipmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShipmentStatus,
    onSuccess: (updated) => {
      // 1. Put the fresh shipment straight into the cache so the page updates instantly
      queryClient.setQueryData(["shipment", updated.trackingNumber], updated);
      // 2. Mark shipment lists as stale so other pages refetch
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });
}
