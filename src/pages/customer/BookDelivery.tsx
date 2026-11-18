"use client"

import { useMemo, useState } from "react"
import type { FormEvent, ReactNode } from "react"

type ServiceLevel = "standard" | "express" | "same-day"
type PackageType = "documents" | "parcel" | "fragile" | "freight"

interface BookingForm {
  pickupAddress: string
  deliveryAddress: string
  packageType: PackageType
  weightKg: string
  service: ServiceLevel
  pickupDate: string
  contactName: string
  contactPhone: string
  notes: string
}

type FormErrors = Partial<Record<keyof BookingForm, string>>

const SERVICES: { value: ServiceLevel; label: string; detail: string; base: number }[] = [
  { value: "standard", label: "Standard", detail: "2 to 4 business days", base: 3500 },
  { value: "express", label: "Express", detail: "Next business day", base: 6500 },
  { value: "same-day", label: "Same day", detail: "Delivered today within the city", base: 11000 },
]

const PACKAGE_TYPES: { value: PackageType; label: string; surcharge: number }[] = [
  { value: "documents", label: "Documents", surcharge: 0 },
  { value: "parcel", label: "Parcel", surcharge: 500 },
  { value: "fragile", label: "Fragile item", surcharge: 2000 },
  { value: "freight", label: "Heavy freight", surcharge: 5000 },
]

const RATE_PER_KG = 450

const INITIAL_FORM: BookingForm = {
  pickupAddress: "",
  deliveryAddress: "",
  packageType: "parcel",
  weightKg: "",
  service: "standard",
  pickupDate: "",
  contactName: "",
  contactPhone: "",
  notes: "",
}

const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount)

const todayISO = () => new Date().toISOString().split("T")[0]

function validate(form: BookingForm): FormErrors {
  const errors: FormErrors = {}

  if (form.pickupAddress.trim().length < 5) {
    errors.pickupAddress = "Enter the full pickup address."
  }
  if (form.deliveryAddress.trim().length < 5) {
    errors.deliveryAddress = "Enter the full delivery address."
  }

  const weight = Number(form.weightKg)
  if (!form.weightKg || Number.isNaN(weight) || weight <= 0) {
    errors.weightKg = "Enter the package weight in kilograms."
  } else if (weight > 1000) {
    errors.weightKg = "For packages over 1,000 kg, contact us for a custom quote."
  }

  if (!form.pickupDate) {
    errors.pickupDate = "Choose a pickup date."
  } else if (form.pickupDate < todayISO()) {
    errors.pickupDate = "Pickup date can't be in the past."
  }

  if (form.contactName.trim().length < 2) {
    errors.contactName = "Enter the name of the person we should contact."
  }

  const digits = form.contactPhone.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 15) {
    errors.contactPhone = "Enter a valid phone number, for example 0811 241 7233."
  }

  return errors
}

// Replace the body of this function with a real API call when your backend is ready, e.g.
//   const res = await fetch("/api/bookings", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(form),
//   })
//   if (!res.ok) throw new Error("Booking failed")
//   return (await res.json()) as { trackingNumber: string }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function submitBooking(_form: BookingForm): Promise<{ trackingNumber: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  const serial = String(Math.floor(Math.random() * 99999)).padStart(5, "0")
  return { trackingNumber: `VL-${new Date().getFullYear()}-${serial}` }
}

const inputClass =
  "mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-1"

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-sm text-slate-600">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookDelivery() {
  const [form, setForm] = useState<BookingForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null)

  const update = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const estimate = useMemo(() => {
    const weight = Number(form.weightKg)
    if (!weight || weight <= 0) return null
    const service = SERVICES.find((s) => s.value === form.service)!
    const pkg = PACKAGE_TYPES.find((p) => p.value === form.packageType)!
    return service.base + pkg.surcharge + Math.ceil(weight) * RATE_PER_KG
  }, [form.weightKg, form.service, form.packageType])

  const borderFor = (key: keyof BookingForm) =>
    errors[key] ? "border-red-600" : "border-slate-300"

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError("")

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0]
      document.getElementById(firstKey)?.focus()
      return
    }

    setSubmitting(true)
    try {
      const result = await submitBooking(form)
      setTrackingNumber(result.trackingNumber)
    } catch {
      setSubmitError("We couldn't complete your booking. Check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function resetBooking() {
    setForm(INITIAL_FORM)
    setErrors({})
    setTrackingNumber(null)
  }

  /* ---------- Confirmation view ---------- */
  if (trackingNumber) {
    const service = SERVICES.find((s) => s.value === form.service)!
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-4xl font-bold text-[#0b2545]">Delivery booked</h1>
        <p className="mt-3 max-w-xl text-lg text-slate-700">
          Your pickup is scheduled. Keep your tracking number to follow the shipment.
        </p>

        <div
          className="mt-8 rounded-lg border border-slate-200 bg-white p-6"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm text-slate-600">Tracking number</p>
          <p className="mt-1 text-3xl font-bold tracking-wide text-[#0b2545]">{trackingNumber}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-600">Pickup</dt>
              <dd className="mt-1 text-slate-900">{form.pickupAddress}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Delivery</dt>
              <dd className="mt-1 text-slate-900">{form.deliveryAddress}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Service</dt>
              <dd className="mt-1 text-slate-900">
                {service.label} ({service.detail})
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Pickup date</dt>
              <dd className="mt-1 text-slate-900">{form.pickupDate}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Estimated cost</dt>
              <dd className="mt-1 text-slate-900">{estimate ? formatNaira(estimate) : "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Contact</dt>
              <dd className="mt-1 text-slate-900">
                {form.contactName}, {form.contactPhone}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/track"
            className="rounded-md bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2"
          >
            Track shipment
          </a>
          <button
            type="button"
            onClick={resetBooking}
            className="rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-[#0b2545] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Book another delivery
          </button>
        </div>
      </div>
    )
  }

  /* ---------- Booking form ---------- */
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-bold text-[#0b2545]">Book a delivery</h1>
      <p className="mt-3 max-w-xl text-lg text-slate-700">
        Tell us where to collect and where to deliver. You will get a tracking number as soon as
        you confirm.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Route */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-[#0b2545]">Pickup and delivery</legend>

            <Field id="pickupAddress" label="Pickup address" error={errors.pickupAddress}>
              <input
                id="pickupAddress"
                type="text"
                autoComplete="street-address"
                placeholder="12 Adeola Odeku Street, Victoria Island, Lagos"
                value={form.pickupAddress}
                onChange={(e) => update("pickupAddress", e.target.value)}
                aria-invalid={!!errors.pickupAddress}
                aria-describedby={errors.pickupAddress ? "pickupAddress-error" : undefined}
                className={`${inputClass} ${borderFor("pickupAddress")}`}
              />
            </Field>

            <Field id="deliveryAddress" label="Delivery address" error={errors.deliveryAddress}>
              <input
                id="deliveryAddress"
                type="text"
                placeholder="5 Aminu Kano Crescent, Wuse 2, Abuja"
                value={form.deliveryAddress}
                onChange={(e) => update("deliveryAddress", e.target.value)}
                aria-invalid={!!errors.deliveryAddress}
                aria-describedby={errors.deliveryAddress ? "deliveryAddress-error" : undefined}
                className={`${inputClass} ${borderFor("deliveryAddress")}`}
              />
            </Field>

            <Field id="pickupDate" label="Pickup date" error={errors.pickupDate}>
              <input
                id="pickupDate"
                type="date"
                min={todayISO()}
                value={form.pickupDate}
                onChange={(e) => update("pickupDate", e.target.value)}
                aria-invalid={!!errors.pickupDate}
                aria-describedby={errors.pickupDate ? "pickupDate-error" : undefined}
                className={`${inputClass} ${borderFor("pickupDate")} sm:max-w-xs`}
              />
            </Field>
          </fieldset>

          {/* Package */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-[#0b2545]">Package</legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="packageType" label="Package type">
                <select
                  id="packageType"
                  value={form.packageType}
                  onChange={(e) => update("packageType", e.target.value as PackageType)}
                  className={`${inputClass} border-slate-300`}
                >
                  {PACKAGE_TYPES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="weightKg" label="Weight (kg)" error={errors.weightKg}>
                <input
                  id="weightKg"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  placeholder="2.5"
                  value={form.weightKg}
                  onChange={(e) => update("weightKg", e.target.value)}
                  aria-invalid={!!errors.weightKg}
                  aria-describedby={errors.weightKg ? "weightKg-error" : undefined}
                  className={`${inputClass} ${borderFor("weightKg")}`}
                />
              </Field>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">Delivery speed</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Delivery speed">
                {SERVICES.map((s) => {
                  const selected = form.service === s.value
                  return (
                    <label
                      key={s.value}
                      className={`cursor-pointer rounded-md border p-4 transition-colors focus-within:ring-2 focus-within:ring-orange-700 focus-within:ring-offset-1 ${
                        selected
                          ? "border-[#0b2545] bg-[#0b2545] text-white"
                          : "border-slate-300 bg-white text-slate-900 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={s.value}
                        checked={selected}
                        onChange={() => update("service", s.value)}
                        className="sr-only"
                      />
                      <span className="block font-semibold">{s.label}</span>
                      <span className={`mt-1 block text-sm ${selected ? "text-slate-200" : "text-slate-600"}`}>
                        {s.detail}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <Field id="notes" label="Notes for the rider (optional)">
              <textarea
                id="notes"
                rows={3}
                placeholder="Gate code, landmarks, or handling instructions"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={`${inputClass} border-slate-300`}
              />
            </Field>
          </fieldset>

          {/* Contact */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-[#0b2545]">Contact on pickup</legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contactName" label="Full name" error={errors.contactName}>
                <input
                  id="contactName"
                  type="text"
                  autoComplete="name"
                  value={form.contactName}
                  onChange={(e) => update("contactName", e.target.value)}
                  aria-invalid={!!errors.contactName}
                  aria-describedby={errors.contactName ? "contactName-error" : undefined}
                  className={`${inputClass} ${borderFor("contactName")}`}
                />
              </Field>

              <Field id="contactPhone" label="Phone number" error={errors.contactPhone}>
                <input
                  id="contactPhone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="0811 241 7233"
                  value={form.contactPhone}
                  onChange={(e) => update("contactPhone", e.target.value)}
                  aria-invalid={!!errors.contactPhone}
                  aria-describedby={errors.contactPhone ? "contactPhone-error" : undefined}
                  className={`${inputClass} ${borderFor("contactPhone")}`}
                />
              </Field>
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold text-[#0b2545]">Estimated cost</h2>

            {estimate ? (
              <>
                <p className="mt-3 text-3xl font-bold text-[#0b2545]">{formatNaira(estimate)}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {SERVICES.find((s) => s.value === form.service)!.label} delivery,{" "}
                  {PACKAGE_TYPES.find((p) => p.value === form.packageType)!.label.toLowerCase()},{" "}
                  {form.weightKg} kg. The final price is confirmed at pickup.
                </p>
              </>
            ) : (
              <p className="mt-3 text-slate-600">Enter the package weight to see an estimate.</p>
            )}

            {submitError && (
              <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-md bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Book delivery"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  )
}