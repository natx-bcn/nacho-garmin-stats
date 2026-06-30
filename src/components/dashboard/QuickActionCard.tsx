import type { ReactNode } from "react";

interface QuickActionCardProps {
  label: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

export default function QuickActionCard({
  label,
  description,
  icon,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-300 transition group-hover:bg-cyan-400/20">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </button>
  );
}