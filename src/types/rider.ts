// Types for the Rider Dashboard only.
// Kept separate from src/constants/shipment.ts on purpose: the rider screens use
// friendly labels like "Picked Up". Later, the backend's statuses (picked_up...)
// get mapped to these labels in ONE place (the rider service).

export const RIDER_STATUSES = [
  'Assigned',
  'Picked Up',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Failed Delivery',
] as const

// Builds the type FROM the array, so the list and the type can never drift apart
export type RiderDeliveryStatus = (typeof RIDER_STATUSES)[number]

export type TrackingEntry = {
  status: RiderDeliveryStatus
  time: string // ISO date-time
  note: string
}

export type ProofOfDelivery = {
  recipientName: string
  notes: string
  deliveredAt: string
  signature: string | null
  fileName: string | null
}

export type RiderDelivery = {
  id: string // tracking ID, e.g. "VL-20481"
  customerName: string
  customerPhone: string
  customerEmail: string
  pickupLocation: string
  destination: string
  deliveryDate: string // ISO date, e.g. "2026-11-17"
  status: RiderDeliveryStatus
  packageType: string
  weight: string
  packageNote: string
  instructions: string
  tracking: TrackingEntry[]
  proof: ProofOfDelivery | null
}
// What the Update Status form sends to the (fake) service
export type StatusUpdateInput = {
  id: string
  status: RiderDeliveryStatus
  note: string
}
// What the Proof of Delivery form sends to the (fake) service
export type ProofInput = {
  id: string
  recipientName: string
  notes: string
  deliveredAt: string
  signature: string | null
  fileName: string | null
}
export type RiderNotificationType = 'assignment' | 'update' | 'alert'

export type RiderNotification = {
  id: string
  type: RiderNotificationType
  title: string
  message: string
  time: string // ISO date-time
  read: boolean
  deliveryId: string | null // which delivery it is about (null = general)
}

export type RiderProfile = {
  id: string // rider ID, e.g. "RID-0042"
  fullName: string
  email: string
  phone: string
  avatarUrl: string | null
  vehicle: string
  zone: string
  joined: string // ISO date
}
// The fields a rider is allowed to change
export type ProfileUpdateInput = Pick<RiderProfile, 'fullName' | 'email' | 'phone' | 'avatarUrl'>