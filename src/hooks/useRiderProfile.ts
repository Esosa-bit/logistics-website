import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRiderProfile, updateRiderProfile } from '../services/rider.service'

const KEY = ['rider', 'profile'] as const

export const useRiderProfile = () =>
  useQuery({ queryKey: KEY, queryFn: getRiderProfile, retry: false, staleTime: 30_000 })

export function useUpdateRiderProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateRiderProfile,
    // Refreshes the profile page AND the header, which share this key
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}