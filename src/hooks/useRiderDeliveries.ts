import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getRiderDelivery,
  getRiderDeliveries,
  submitProofOfDelivery,
  updateDeliveryStatus,
} from '../services/rider.service'

export const useRiderDeliveries = () =>
  useQuery({
    queryKey: ['rider', 'deliveries'],
    queryFn: getRiderDeliveries,
    retry: false,
    staleTime: 30_000,
  })

export const useRiderDelivery = (id: string | undefined) =>
  useQuery({
    queryKey: ['rider', 'deliveries', id],
    queryFn: () => getRiderDelivery(id ?? ''),
    enabled: Boolean(id),
    retry: false,
  })

export function useUpdateDeliveryStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDeliveryStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rider', 'deliveries'] }),
  })
}

export function useSubmitProof() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: submitProofOfDelivery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rider', 'deliveries'] }),
  })
}