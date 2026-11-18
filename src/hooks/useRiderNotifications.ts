import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getRiderNotifications,
  markAllNotificationsRead,
  setNotificationRead,
} from '../services/rider.service'

const KEY = ['rider', 'notifications'] as const

export const useRiderNotifications = () =>
  useQuery({ queryKey: KEY, queryFn: getRiderNotifications, retry: false, staleTime: 30_000 })

export function useSetNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: setNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}