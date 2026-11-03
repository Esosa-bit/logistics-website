import type { ShipmentStatus } from "../types";

const STYLES: Partial<Record<ShipmentStatus, string>> = {
  Pending: "bg-amber-100 text-amber-700",
  Delivered: "bg-emerald-100 text-emerald-700",
};

const FALLBACK = "bg-gray-100 text-gray-700";

interface StatusBadgeProps {
  status: ShipmentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] ?? FALLBACK}`}
    >
      {status}
    </span>
  );
}