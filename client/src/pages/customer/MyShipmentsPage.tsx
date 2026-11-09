import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import { SHIPMENT_STATUSES } from "../../types";
import type { ShipmentStatus } from "../../types";
import { useMyShipments } from "../../customer/shipmentHooks";

export default function MyShipmentsPage() {
  // All hooks first, before any early return.
  const { data, isPending, isError, error, refetch } = useMyShipments();
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | "All">("All");
  const [search, setSearch] = useState("");

  if (isPending) {
    return (
      <p role="status" className="text-gray-600">
        Loading your shipments...
      </p>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p>Something went wrong: {error.message}</p>
        <button onClick={() => refetch()} className="mt-2 underline">
          Try again
        </button>
      </div>
    );
  }

  const term = search.trim().toLowerCase();
  const visible = data.filter((s) => {
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    const matchesSearch = term === "" || s.id.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  return (
    <section>
      <h1 className="text-2xl font-bold text-gray-900">My Shipments</h1>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search by tracking number
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="VL-1001"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ShipmentStatus | "All")}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="All">All statuses</option>
            {SHIPMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="mt-6 text-gray-600">You have no shipments yet.</p>
      ) : visible.length === 0 ? (
        <p className="mt-6 text-gray-600">No shipments match your search or filter.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((s) => (
            <li key={s.id}>
              <Link
                to={`/customer/shipments/${s.id}`}
                className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-orange-400"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{s.id}</p>
                    <p className="break-words text-sm text-gray-600">To: {s.receiverName}</p>
                    <p className="break-words text-sm text-gray-500">{s.destination}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={s.status} />
                    <p className="mt-2 text-xs text-gray-500">{s.date}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}