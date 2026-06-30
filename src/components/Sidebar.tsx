import { NavLink } from 'react-router-dom'
import { useActivityStore } from '../stores/activityStore'

const NAV = [
  { to: '/', label: 'Dashboard', shortLabel: 'Inicio', icon: '◉' },
  { to: '/activities', label: 'Actividades', shortLabel: 'Activ.', icon: '▤' },
  { to: '/fitness', label: 'Fitness & Forma', shortLabel: 'Fitness', icon: '📈' },
  { to: '/zones', label: 'Zonas', shortLabel: 'Zonas', icon: '🔥' },
  { to: '/performance', label: 'Rendimiento', shortLabel: 'Rend.', icon: '⚡' },
  { to: '/records', label: 'Récords', shortLabel: 'Récords', icon: '🏅' },
  { to: '/settings', label: 'Ajustes', shortLabel: 'Ajustes', icon: '⚙' },
]

export default function Sidebar() {
  const stats = useActivityStore(s => s.stats)
  const activities = useActivityStore(s => s.activities)

  return (
    <>
      <aside className="hidden lg:flex lg:w-56 xl:w-64 shrink-0 bg-slate-900 border-r border-slate-700/50 flex-col min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-slate-700/50">
          <div className="text-blue-400 font-bold text-lg tracking-tight">Garmin Stats</div>
          <div className="text-slate-500 text-xs mt-0.5">
            {activities.length > 0 ? `${activities.length} actividades` : 'Sin datos aún'}
          </div>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {NAV.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`
              }
            >
              <span className="text-base">{icon}</span>
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        {stats && (
          <div className="px-5 py-4 border-t border-slate-700/50">
            <div className="text-xs text-slate-500">
              Última sync
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {new Date(stats.syncedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="mt-3 text-xs text-slate-600 leading-relaxed">
              Auto-sync GitHub Actions
            </div>
          </div>
        )}
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700/70 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
        <div className="grid grid-cols-5 gap-1 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {NAV.slice(0, 5).map(({ to, shortLabel, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300'
                    : 'text-slate-500 hover:text-slate-200'
                }`
              }
            >
              <span className="text-base leading-none">{icon}</span>
              <span className="truncate leading-none">{shortLabel}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}