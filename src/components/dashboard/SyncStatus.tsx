import { CheckCircle2, Clock3 } from "lucide-react";

interface SyncStatusProps {
  lastSync?: string;
}

export default function SyncStatus({ lastSync = "Hoy" }: SyncStatusProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Synced
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
        <Clock3 className="h-3.5 w-3.5" />
        Last sync: {lastSync}
      </div>
    </div>
  );
}