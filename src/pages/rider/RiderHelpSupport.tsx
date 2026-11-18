import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { SupportForm } from '../../components/rider/forms/SupportForm'
import { useRiderProfile } from '../../hooks/useRiderProfile'
import { cn } from '../../lib/cn'
import { riderFaqs } from '../../mocks/riderData'

export default function RiderHelpSupport() {
  // Which question is open? 0 = first, 1 = second ... null = all closed
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { data: rider } = useRiderProfile()

  return (
    <>
      <RiderPageHeader title="Help & Support" subtitle="Find quick answers or contact the support team." />

      <div className="grid gap-6 lg:grid-cols-2">
        <RiderCard className="p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Frequently asked questions</h2>
          <div className="divide-y divide-ink-200">
            {riderFaqs.map((faq, index) => {
              const open = openIndex === index
              return (
                <div key={faq.q}>
                  <h3 className="text-sm">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left font-semibold text-navy-900"
                    >
                      {faq.q}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn('size-5 shrink-0 text-orange-600 transition-transform', open && 'rotate-180')}
                      />
                    </button>
                  </h3>
                  {open && <p className="pb-4 text-sm">{faq.a}</p>}
                </div>
              )
            })}
          </div>
        </RiderCard>

        <RiderCard className="p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Contact support</h2>
          {/* `key` builds a fresh form once the rider's profile has loaded, so the defaults fill in */}
          <SupportForm key={rider?.id ?? 'loading'} defaultName={rider?.fullName} defaultEmail={rider?.email} />
        </RiderCard>
      </div>
    </>
  )
}