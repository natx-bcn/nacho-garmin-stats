import {
  Activity,
  BarChart3,
  CalendarDays,
  Gauge,
  RefreshCw,
  Route,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

import HeaderMetricCard from './HeaderMetricCard'
import QuickActionCard from './QuickActionCard'
import SyncStatus from './SyncStatus'

export default function DashboardHeader() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)]" />

      <div className="absolute inset-x-0 bottom-0 h-40 opacity-30">
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-cyan-500/10 to-transparent" />
        <svg
          viewBox="0 0 1200 240"
          className="absolute bottom-0 h-full w-full text-slate-700/40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 220L120 140L220 185L360 70L520 170L680 95L830 155L980 55L1200 170V240H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <Activity className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Garmin Stats
                </h1>
                <p className="text-sm text-slate-400">
                  Personal Performance Dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              v5.4.1
            </div>

            <SyncStatus lastSync="Hoy" />
          </div>
        </div>

        <div className="mb-8 max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
            <Zap className="h-3.5 w-3.5" />
            Dashboard PRO
          </p>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Buenos días, Nacho 👋
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
            Has entrenado bien esta semana. Mantén el equilibrio entre carga,
            recuperación y constancia.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <HeaderMetricCard
            title="Fitness"
            value="82"
            subtitle="+8% este mes"
            icon={<Gauge className="h-7 w-7" />}
          />

          <HeaderMetricCard
            title="Recovery"
            value="16 h"
            subtitle="Listo para entrenar"
            icon={<ShieldCheck className="h-7 w-7" />}
          />

          <HeaderMetricCard
            title="Load"
            value="635"
            subtitle="Carga controlada"
            icon={<TrendingUp className="h-7 w-7" />}
          />

          <HeaderMetricCard
            title="Weekly"
            value="48 km"
            subtitle="4 actividades"
            icon={<Route className="h-7 w-7" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <QuickActionCard
            label="Sync Garmin"
            description="Actualizar datos"
            icon={<RefreshCw className="h-5 w-5" />}
          />

          <QuickActionCard
            label="Activities"
            description="Ver entrenamientos"
            icon={<CalendarDays className="h-5 w-5" />}
          />

          <QuickActionCard
            label="Statistics"
            description="Analizar rendimiento"
            icon={<BarChart3 className="h-5 w-5" />}
          />

          <QuickActionCard
            label="Settings"
            description="Configurar objetivos"
            icon={<Settings className="h-5 w-5" />}
          />
        </div>
      </div>
    </section>
  )
}