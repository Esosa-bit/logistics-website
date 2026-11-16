import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  tone?: "navy" | "brand";
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  tone = "navy",
}: StatCardProps) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-card-icon">
        <Icon size={24} />
      </div>

      <div className="stat-card-content">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}