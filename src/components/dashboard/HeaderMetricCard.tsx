import type { ReactNode } from "react";
import Card from "../ui/Card";

interface HeaderMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
}

export default function HeaderMetricCard({
  title,
  value,
  subtitle,
  icon,
}: HeaderMetricCardProps) {
  return (
    <Card className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">
          {title}
        </p>

        <h3 className="mt-2 text-3xl font-bold text-white">
          {value}
        </h3>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
        {icon}
      </div>
    </Card>
  );
}