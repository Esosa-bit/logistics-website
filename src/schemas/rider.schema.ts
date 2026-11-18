import { z } from 'zod'
import { RIDER_STATUSES } from '../types/rider'

export const statusUpdateSchema = z
  .object({
    status: z.enum(RIDER_STATUSES),
    note: z.string().max(200, 'Keep the note under 200 characters.'),
  })
  // A rule that looks at TWO fields together:
  // a failed delivery must come with a reason.
  .refine((v) => v.status !== 'Failed Delivery' || v.note.trim().length >= 5, {
    path: ['note'], // show the error under the Note field
    message: 'Please explain why the delivery failed (at least 5 characters).',
  })

// TypeScript type built FROM the schema, so rules and types never drift apart
export type StatusUpdateValues = z.infer<typeof statusUpdateSchema>
export const proofSchema = z.object({
  recipientName: z.string().trim().min(2, "Enter the recipient's full name."),
  notes: z
    .string()
    .trim()
    .min(5, 'Add a short confirmation note.')
    .max(300, 'Keep notes under 300 characters.'),
  deliveredAt: z.string().min(1, 'Choose the delivery date and time.'),
})
export type ProofValues = z.infer<typeof proofSchema>
// Nigerian numbers: 0803..., 0813..., 0701..., 0901... or +234803...
const phoneRegex = /^(\+234|0)[789][01]\d{8}$/

export const riderProfileSchema = z.object({
  fullName: z.string().trim().min(3, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid Nigerian phone number, e.g. 08031234567.'),
})
export type RiderProfileValues = z.infer<typeof riderProfileSchema>
export const supportSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  subject: z.string().trim().min(3, 'Add a short subject.'),
  message: z.string().trim().min(10, 'Please describe the issue (at least 10 characters).'),
})
export type SupportValues = z.infer<typeof supportSchema>