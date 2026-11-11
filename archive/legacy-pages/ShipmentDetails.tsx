import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* 1. TYPES: the shape of the data this page expects                   */
/* ------------------------------------------------------------------ */

// The only values a status is allowed to have.
type ShipmentStatus =
  | "PENDING"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  timestamp: string; // ISO date-time text, e.g. "2026-10-29T18:02:00Z"
  location?: string; // "?" means optional
  note?: string;
}

interface Contact {
  name: string;
  phone: string;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  description: string;
  status: ShipmentStatus;
  bookingDate: string;
  expectedDeliveryDate: string;
  sender: Contact;
  receiver: Contact;
  pickupAddress: string;
  deliveryAddress: string;
  trackingHistory: TrackingEvent[];
}

/* ------------------------------------------------------------------ */
/* 2. MOCK DATA: NOT REAL. Remove when the backend API exists.         */
/* ------------------------------------------------------------------ */

const mockShipment: Shipment = {
  id: "1",
  trackingNumber: "TRK-2026-000123",
  description: "2 boxes of electronics (laptop and accessories)",
  status: "OUT_FOR_DELIVERY",
  bookingDate: "2026-10-26T10:30:00Z",
  expectedDeliveryDate: "2026-10-30T17:00:00Z",
  sender: { name: "Ada Okafor", phone: "+234 800 000 0001" },
  receiver: { name: "Chinedu Eze", phone: "+234 800 000 0002" },
  pickupAddress: "12 Example Street, Ikeja, Lagos",
  deliveryAddress: "45 Sample Road, Wuse 2, Abuja",
  trackingHistory: [
    {
      id: "e1",
      status: "PENDING",
      timestamp: "2026-10-26T10:30:00Z",
      note: "Booking received",
    },
    {
      id: "e2",
      status: "PICKED_UP",
      timestamp: "2026-10-27T09:10:00Z",
      location: "Ikeja, Lagos",
      note: "Package collected from sender",
    },
    {
      id: "e3",
      status: "IN_TRANSIT",
      timestamp: "2026-10-28T14:45:00Z",
      location: "Lagos Sorting Hub",
    },
    {
      id: "e4",
      status: "IN_TRANSIT",
      timestamp: "2026-10-29T18:02:00Z",
      location: "Abuja Hub",
      note: "Arrived at destination city",
    },
    {
      id: "e5",
      status: "OUT_FOR_DELIVERY",
      timestamp: "2026-10-30T09:15:00Z",
      location: "Abuja",
      note: "With delivery rider",
    },
  ],
};

// ⚠️ MOCK: pretends to be a network request.
// When the backend exists, replace the body with a real request
// (for example GET /shipments/:id) and delete mockShipment above.
async function fetchShipment(shipmentId: string): Promise<Shipment> {
  await new Promise((resolve) => setTimeout(resolve, 800)); // fake delay
  if (shipmentId !== mockShipment.id) {
    throw new Error("Shipment not found");
  }
  return mockShipment;
}

/* ------------------------------------------------------------------ */
/* 3. HELPERS                                                          */
/* ------------------------------------------------------------------ */

// "2026-10-26T10:30:00Z" -> "26 Oct 2026"
function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// "2026-10-26T10:30:00Z" -> "26 Oct 2026, 11:30"
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
const STATUS_STYLES: Record<ShipmentStatus, { label: string; classes: string }> =
  {
    PENDING: { label: "Pending", classes: "bg-gray-100 text-gray-700" },
    PICKED_UP: { label: "Picked up", classes: "bg-blue-100 text-blue-700" },
    IN_TRANSIT: {
      label: "In transit",
      classes: "bg-indigo-100 text-indigo-700",
    },
    OUT_FOR_DELIVERY: {
      label: "Out for delivery",
      classes: "bg-amber-100 text-amber-800",
    },
    DELIVERED: { label: "Delivered", classes: "bg-green-100 text-green-700" },
    CANCELLED: { label: "Cancelled", classes: "bg-red-100 text-red-700" },
  };

/* ------------------------------------------------------------------ */
/* 4. SMALL COMPONENTS (only used inside this file)                    */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: ShipmentStatus }) {
  const { label, classes } = STATUS_STYLES[status];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

interface InfoCardProps {
  title: string;
  name?: string;
  phone?: string;
  address?: string;
}

function InfoCard({ title, name, phone, address }: InfoCardProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {/* "&&" means: only show the line if the value exists */}
      {name && <p className="font-medium text-gray-900">{name}</p>}
      {phone && <p className="text-gray-600">{phone}</p>}
      {address && <p className="text-gray-600">{address}</p>}
    </section>
  );
}

function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  // Empty state
  if (events.length === 0) {
    return (
      <p className="text-gray-500">No tracking updates yet. Check back soon.</p>
    );
  }

  // Newest first. [...events] makes a copy, because .sort() changes the
  // array it is called on and we must never change props.
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <ol className="relative border-l-2 border-gray-200 pl-6 text-left">
      {sortedEvents.map((event, index) => (
        <li key={event.id} className="mb-8 last:mb-0">
          {/* The dot on the line; the latest update is highlighted */}
          <span
            className={`absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-white ${
              index === 0 ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-hidden="true"
          />
          <StatusBadge status={event.status} />
          <time
            dateTime={event.timestamp}
            className="mt-1 block text-sm text-gray-500"
          >
            {formatDateTime(event.timestamp)}
          </time>
          {event.location && (
            <p className="text-sm text-gray-700">{event.location}</p>
          )}
          {event.note && <p className="text-sm text-gray-600">{event.note}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* 5. THE PAGE                                                         */
/* ------------------------------------------------------------------ */

interface ShipmentDetailsPageProps {
  // TEMPORARY: once React Router is set up by the team, read this from the
  // URL with useParams() instead of a prop. "1" is the id of our mock shipment.
  shipmentId?: string;
}

export default function ShipmentDetailsPage({
  shipmentId = "1",
}: ShipmentDetailsPageProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If the page closes before the answer arrives, ignore the late answer.
    let isCancelled = false;

    // Note: we don't call setIsLoading(true) here. The states already start
    // as "loading, no error", and calling setState directly inside an effect
    // is flagged by React's lint rules because it can cause extra re-renders.
    // We only set state later, inside the .then / .catch callbacks.
    fetchShipment(shipmentId)
      .then((result) => {
        if (isCancelled) return;
        setShipment(result);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (isCancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setIsLoading(false);
      });

    // Cleanup function: React runs this when the page goes away.
    return () => {
      isCancelled = true;
    };
  }, [shipmentId]);

  // The page decides what to show, top to bottom:
  // 1. Loading
  if (isLoading) {
    return (
      <p role="status" className="p-6 text-gray-500">
        Loading shipment…
      </p>
    );
  }

  // 2. Error
  if (error) {
    return (
      <div role="alert" className="p-6 text-red-700">
        <p className="font-semibold">We couldn’t load this shipment.</p>
        <p>{error}</p>
      </div>
    );
  }

  // 3. Empty (no error, but no data either)
  if (!shipment) {
    return <p className="p-6 text-gray-500">No shipment data available.</p>;
  }

  // 4. Success
  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6"> 
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 text-left">
        <div>
          <p className="text-sm text-gray-500">Tracking number</p>
          <h1 className="text-2xl font-bold text-gray-900">
            {shipment.trackingNumber}
          </h1>
        </div>
        <StatusBadge status={shipment.status} />
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Shipment summary
            </h3>
            {/* <dl> = description list: pairs of label (dt) and value (dd) */}
            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-500">Description</dt>
                <dd className="font-medium text-gray-900">
                  {shipment.description}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Booked on</dt>
                <dd className="font-medium text-gray-900">
                  {formatDate(shipment.bookingDate)}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Expected delivery</dt>
                <dd className="font-medium text-gray-900">
                  {formatDate(shipment.expectedDeliveryDate)}
                </dd>
              </div>
            </dl>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              title="Sender"
              name={shipment.sender.name}
              phone={shipment.sender.phone}
            />
            <InfoCard
              title="Receiver"
              name={shipment.receiver.name}
              phone={shipment.receiver.phone}
            />
            <InfoCard title="Pickup address" address={shipment.pickupAddress} />
            <InfoCard
              title="Delivery address"
              address={shipment.deliveryAddress}
            />
          </div>
        </div>

        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-left text-lg font-semibold text-gray-900">
            Tracking history
          </h2>
          <TrackingTimeline events={shipment.trackingHistory} />
        </section>
      </div>
     </main>
  );
}