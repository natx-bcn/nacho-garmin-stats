import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, CalendarDays, ChevronRight, RefreshCw, Target } from 'lucide-react'

export default function QuickActions() {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Accesos rápidos
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <QuickLink to="/activities" label="Actividades" description="Ver entrenamientos" tone="cyan" icon={<CalendarDays />} />
        <QuickLink to="/fitness" label="Fitness" description="Carga y evolución" tone="purple" icon={<BarChart3 />} />
        <QuickLink to="/performance" label="Rendimiento" description="Analizar progreso" tone="orange" icon={<Target />} />
        <QuickLink to="/settings" label="Sync Garmin" description="Actualizar datos" tone="blue" icon={<RefreshCw />} />
      </div>
    </div>
  )
}

function QuickLink({
  to,
  label,
  description,
  icon,
  tone,
}: {
  to: string
  label: string
  description: string
  icon: ReactNode
  tone: 'cyan' | 'purple' | 'orange' | 'blue'
}) {
  const tones = {
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300 hover:border-cyan-300/50',
    purple: 'border-purple-400/20 bg-purple-400/10 text-purple-300 hover:border-purple-300/50',
    orange: 'border-orange-400/20 bg-orange-400/10 text-orange-300 hover:border-orange-300/50',
    blue: 'border-blue-400/20 bg-blue-400/10 text-blue-300 hover:border-blue-300/50',
  }

  return (
    <Link
      to={to}
      className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 ${tones[tone]}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/20">
          <div className="h-6 w-6">{icon}</div>
        </div>

        <div>
          <p className="text-sm font-bold text-white">{label}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
    </Link>
  )
}