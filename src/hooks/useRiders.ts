import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRider,
  listRiders,
  setRiderStatus,
  updateRider,
} from "../services/riders.service";

export function useRiders() {
  return useQuery({ queryKey: ["riders"], queryFn: listRiders });
}

export function useCreateRider() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRider,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["riders"] }),
  });
}

export function useUpdateRider() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRider,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["riders"] }),
  });
}

export function useSetRiderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setRiderStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["riders"] }),
  });
}
