import { formatDateTime } from '../../lib/format'
import type { ProofOfDelivery } from '../../types/rider'

export function ProofSummary({ proof }: { proof: ProofOfDelivery }) {
  return (
    <dl className="grid gap-4 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-xs uppercase tracking-wide">Received by</dt>
        <dd className="font-medium text-navy-900">{proof.recipientName}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wide">Delivered at</dt>
        <dd className="font-medium text-navy-900">{formatDateTime(proof.deliveredAt)}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-xs uppercase tracking-wide">Notes</dt>
        <dd>{proof.notes}</dd>
      </div>
      {proof.fileName && (
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wide">Uploaded proof</dt>
          <dd>{proof.fileName}</dd>
        </div>
      )}
      {proof.signature && (
        <div className="sm:col-span-2">
          <dt className="mb-1 text-xs uppercase tracking-wide">Signature</dt>
          <dd>
            <img
              src={proof.signature}
              alt="Recipient's signature"
              className="h-24 rounded-lg border border-ink-200 bg-white"
            />
          </dd>
        </div>
      )}
    </dl>
  )
}