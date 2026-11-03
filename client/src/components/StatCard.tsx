import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;            // the icon COMPONENT, not <Icon />
  value: number | string;
  label: string;
  tone?: "navy" | "brand";     // "?" = optional
}

export default function StatCard({ icon: Icon, value, label, tone = "navy" }: StatCardProps) {
  // ...
}