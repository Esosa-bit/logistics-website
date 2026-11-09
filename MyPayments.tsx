import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* 1. TYPES                                                            */
/* ------------------------------------------------------------------ */

// The only values a payment status is allowed to have.
type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

type PaymentMethod = "Card" | "Bank transfer" | "Cash on delivery";

interface Payment {
  id: string;
  receiptNumber: string;
  shipmentReference: string;
  amount: number; // in naira (confirm with backend: naira or kobo?)
  currency: string; // e.g. "NGN"
  paidAt: string; // ISO date-time text
  method: PaymentMethod;
  status: PaymentStatus;
}

/* ------------------------------------------------------------------ */
/* 2. MOCK DATA: NOT REAL. Remove when the backend API exists.         */
/* ------------------------------------------------------------------ */

const IS_MOCK = true;

const mockPayments: Payment[] = [
  {
    id: "p1",
    receiptNumber: "RCT-2026-0001",
    shipmentReference: "TRK-2026-000123",
    amount: 12500,
    currency: "NGN",
    paidAt: "2026-10-26T10:35:00Z",
    method: "Card",
    status: "PAID",
  },
  {
    id: "p2",
    receiptNumber: "RCT-2026-0002",
    shipmentReference: "TRK-2026-000140",
    amount: 8000,
    currency: "NGN",
    paidAt: "2026-10-28T15:10:00Z",
    method: "Bank transfer",
    status: "PENDING",
  },
  {
    id: "p3",
    receiptNumber: "RCT-2026-0003",
    shipmentReference: "TRK-2026-000099",
    amount: 5600,
    currency: "NGN",
    paidAt: "2026-10-20T09:00:00Z",
    method: "Card",
    status: "FAILED",
  },
  {
    id: "p4",
    receiptNumber: "RCT-2026-0004",
    shipmentReference: "TRK-2026-000087",
    amount: 21000,
    currency: "NGN",
    paidAt: "2026-10-15T12:45:00Z",
    method: "Cash on delivery",
    status: "REFUNDED",
  },
];

// ⚠️ MOCK: pretends to be a network request.
// When the backend exists, replace the body with a real request
// (for example GET /payments) and delete mockPayments above.
// The backend must return ONLY the logged-in customer's payments.
async function fetchPayments(): Promise<Payment[]> {
  await new Promise((resolve) => setTimeout(resolve, 800)); // fake delay
  return mockPayments;
}

/* ------------------------------------------------------------------ */
/* 3. HELPERS                                                          */
/* ------------------------------------------------------------------ */

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(
    amount,
  );
}

function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// One entry per status. Record<...> makes TypeScript complain if we forget one.
const PAYMENT_STATUS_STYLES: Record<
  PaymentStatus,
  { label: string; classes: string }
> = {
  PAID: { label: "Paid", classes: "bg-green-100 text-green-700" },
  PENDING: { label: "Pending", classes: "bg-amber-100 text-amber-800" },
  FAILED: { label: "Failed", classes: "bg-red-100 text-red-700" },
  REFUNDED: { label: "Refunded", classes: "bg-gray-100 text-gray-700" },
};

/* ------------------------------------------------------------------ */
/* 4. SMALL COMPONENTS (only used inside this file)                    */
/* ------------------------------------------------------------------ */

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, classes } = PAYMENT_STATUS_STYLES[status];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

interface ReceiptProps {
  payment: Payment;
  onClose: () => void;
}

function Receipt({ payment, onClose }: ReceiptProps) {
  return (
    <section
      aria-label="Receipt"
      className="mt-6 rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">Payment receipt</h2>
      <p className="text-sm text-gray-500">{payment.receiptNumber}</p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-gray-500">Shipment reference</dt>
          <dd className="font-medium text-gray-900">
            {payment.shipmentReference}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Amount paid</dt>
          <dd className="font-medium text-gray-900">
            {formatMoney(payment.amount, payment.currency)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Date</dt>
          <dd className="font-medium text-gray-900">
            {formatDateTime(payment.paidAt)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Payment method</dt>
          <dd className="font-medium text-gray-900">{payment.method}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Status</dt>
          <dd>
            <PaymentStatusBadge status={payment.status} />
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex gap-3">
        {/* window.print() is a real browser function: it opens the print
            dialog, which can also "Save as PDF". */}
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Print receipt
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. THE PAGE                                                         */
/* ------------------------------------------------------------------ */

export default function MyPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    // If the page closes before the answer arrives, ignore the late answer.
    let isCancelled = false;

    fetchPayments()
      .then((result) => {
        if (isCancelled) return;
        setPayments(result);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (isCancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 1. Loading
  if (isLoading) {
    return (
      <p role="status" className="p-6 text-gray-500">
        Loading payments…
      </p>
    );
  }

  // 2. Error
  if (error) {
    return (
      <div role="alert" className="p-6 text-red-700">
        <p className="font-semibold">We couldn’t load your payments.</p>
        <p>{error}</p>
      </div>
    );
  }

  // 3 & 4. Empty or success
  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <header className="mb-6 text-left">
        <h1 className="text-2xl font-bold text-gray-900">My payments</h1>
        <p className="text-gray-500">
          Your payment history and receipts for shipments.
        </p>
      </header>

      {IS_MOCK && (
        <p
          role="note"
          className="mb-4 rounded-md bg-yellow-50 p-3 text-left text-sm text-yellow-800"
        >
          Demo mode: this page shows sample data, not real payments.
        </p>
      )}

      {payments.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500">
          You have no payments yet. They will appear here after you book and pay
          for a delivery.
        </p>
      ) : (
        // overflow-x-auto lets the table scroll sideways on small phones
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Shipment
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Method
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {payment.shipmentReference}
                  </td>
                  <td className="px-4 py-3">
                    {formatMoney(payment.amount, payment.currency)}
                  </td>
                  <td className="px-4 py-3">{formatDateTime(payment.paidAt)}</td>
                  <td className="px-4 py-3">{payment.method}</td>
                  <td className="px-4 py-3">
                    <PaymentStatusBadge status={payment.status} />
                  </td>
                  <td className="px-4 py-3">
                    {/* Receipts only exist for payments that went through */}
                    {payment.status === "PAID" ? (
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(payment)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View receipt
                      </button>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPayment && (
        <Receipt
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </main>
  );
}