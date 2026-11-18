// FAKE API for the Rider Dashboard (frontend-only stage).
// When the backend exists, rewrite the inside of these functions to call it.
// Hooks, pages and components will not need to change.
import { deliveriesSeed, notificationsSeed, riderSeed } from '../mocks/riderData'
import { nowForInput } from '../lib/riderDates'
import { wait } from '../lib/wait'
import type {
  ProfileUpdateInput,
  ProofInput,
  RiderDelivery,
  RiderNotification,
  RiderProfile,
  StatusUpdateInput,
} from '../types/rider'
// `let` because we REPLACE this array when a notification changes
let notifications: RiderNotification[] = structuredClone(notificationsSeed)

let profile: RiderProfile = { ...riderSeed }
// structuredClone makes a safe copy, so we never edit the seed data directly
const deliveries: RiderDelivery[] = structuredClone(deliveriesSeed)

export async function getRiderDeliveries(): Promise<RiderDelivery[]> {
  await wait(500)
  return [...deliveries]
}
const NOT_FOUND = 'Delivery not found. Check the tracking ID and try again.'

export async function getRiderDelivery(id: string): Promise<RiderDelivery> {
  await wait(300)
  const found = deliveries.find((d) => d.id === id)
  if (!found) throw new Error(NOT_FOUND)
  return found
}
// Find a delivery, apply a change to it, store the result, and return it
function patchDelivery(id: string, update: (d: RiderDelivery) => RiderDelivery): RiderDelivery {
  const index = deliveries.findIndex((d) => d.id === id)
  if (index === -1) throw new Error(NOT_FOUND)
  deliveries[index] = update(deliveries[index])
  return deliveries[index]
}

export async function updateDeliveryStatus({ id, status, note }: StatusUpdateInput) {
  await wait(600)
  return patchDelivery(id, (d) => ({
    ...d, // copy every existing field...
    status, // ...then replace the status
    tracking: [
      ...d.tracking, // keep the old events and add a new one at the end
      { status, time: nowForInput(), note: note.trim() || `Status changed to ${status}.` },
    ],
  }))
}
export async function submitProofOfDelivery(input: ProofInput) {
  await wait(700)
  // Split the input: `id` picks the delivery, everything else is the proof
  const { id, ...proof } = input
  return patchDelivery(id, (d) => ({
    ...d,
    status: 'Delivered',
    proof,
    tracking: [
      ...d.tracking,
      { status: 'Delivered', time: proof.deliveredAt, note: `Received by ${proof.recipientName}.` },
    ],
  }))
}
/* ---------- Notifications ---------- */

export async function getRiderNotifications(): Promise<RiderNotification[]> {
  await wait(400)
  return [...notifications]
}

// .map builds a NEW list where only the matching notification is changed
export async function setNotificationRead({ id, read }: { id: string; read: boolean }) {
  await wait(150)
  notifications = notifications.map((n) => (n.id === id ? { ...n, read } : n))
}

export async function markAllNotificationsRead() {
  await wait(200)
  notifications = notifications.map((n) => ({ ...n, read: true }))
}

/* ---------- Profile ---------- */

export async function getRiderProfile(): Promise<RiderProfile> {
  await wait(300)
  return profile
}
export async function updateRiderProfile(values: ProfileUpdateInput): Promise<RiderProfile> {
  await wait(600)
  // Copy the old profile, then overwrite only the fields that were sent.
  // The rider ID can never change, because it is not part of `values`.
  profile = { ...profile, ...values }
  return profile
}