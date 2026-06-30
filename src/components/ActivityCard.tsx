import { Link } from 'react-router-dom'
import type { ActivitySummary } from '../types/garmin'
import {
  formatPace,
  formatDuration,
  formatDistance,
  formatRelativeTime,
  sportLabel,
  sportColor,
  sportIcon,
} from '../utils/formatters'

interface Props {
  activity: ActivitySummary
  compact?: boolean
}

export default function ActivityCard({ activity: a, compact }: Props) {
  const color = sportColor(a.sport)

  return (
    <Link
      to={`/activity/${a.id}`}
      className="block rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 transition-colors hover:border-slate-500/70 hover:bg-slate-800"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl text-xl shrink-0"
          style={{
            background: `${color}18`,
            border: `1px solid ${color}30`,
          }}
        >
          {sportIcon(a.sport)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-base font-bold text-slate-100">
                {a.title}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {formatRelativeTime(a.startTime)} · {sportLabel(a.sport)}
              </div>
            </div>

            {a.aerobicTE != null && (
              <div
                className="inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-bold"
                style={{
                  color,
                  borderColor: `${color}40`,
                  background: `${color}15`,
                }}
              >
                TE {a.aerobicTE.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        <Metric
          label="Distancia"
          value={formatDistance(a.distance, a.sport)}
        />

        <Metric
          label="Duración"
          value={formatDuration(a.duration)}
        />

        {a.sport === 'running' && a.avgPace ? (
          <Metric
            label="Ritmo"
            value={formatPace(a.avgPace)}
          />
        ) : a.sport === 'cycling' && a.avgSpeed ? (
          <Metric
            label="Velocidad"
            value={`${a.avgSpeed} km/h`}
          />
        ) : a.sport === 'swimming' && a.swolf ? (
          <Metric
            label="SWOLF"
            value={String(Math.round(a.swolf))}
          />
        ) : (
          <Metric
            label="FC Media"
            value={a.avgHR > 0 ? `${a.avgHR} bpm` : '–'}
          />
        )}
      </div>

      {!compact && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 border-t border-slate-700/40 pt-3">
          <Metric
            label="FC Media"
            value={a.avgHR > 0 ? `${a.avgHR} bpm` : '–'}
          />

          <Metric
            label="Desnivel"
            value={`${a.elevationGain} m`}
          />

          <Metric
            label="TSS"
            value={a.tss != null ? String(Math.round(a.tss)) : '–'}
          />
        </div>
      )}
    </Link>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg bg-slate-900/35 p-2">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="mt-1 text-base font-bold text-slate-100">
        {value}
      </div>
    </div>
  )
}