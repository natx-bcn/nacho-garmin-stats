import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Activity,
  Award,
  BarChart3,
  Flame,
  Gauge,
  Home,
  Menu,
  Settings,
  X,
} from 'lucide-react'
import { useActivityStore } from '../stores/activityStore'
import { APP_VERSION, APP_VERSION_NAME } from '../config/version'

const NAV = [
  { to: '/', label: 'Dashboard', shortLabel: 'Inicio', Icon: Home },
  { to: '/activities', label: 'Actividades', shortLabel: 'Activ.', Icon: Activity },
  { to: '/fitness', label: 'Fitness & Forma', shortLabel: 'Fitness', Icon: BarChart3 },
  { to: '/zones', label: 'Zonas', shortLabel: 'Zonas', Icon: Flame },
  { to: '/performance', label: 'Rendimiento', shortLabel: 'Rend.', Icon: Gauge },
  { to: '/records', label: 'Récords', shortLabel: 'Récords', Icon: Award },
  { to: '/settings', label: 'Ajustes', shortLabel: 'Ajustes', Icon: Settings },
]

const MOBILE_MAIN = [NAV[0], NAV[1], NAV[2], NAV[5]]
const MOBILE_MORE = [NAV[3], NAV[4], NAV[6]]

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const stats = useActivityStore(s => s.stats)
  const activities = useActivityStore(s => s.activities)

  return (
    <>
      <aside className="hidden lg:flex lg:w-56 xl:w-64 shrink-0 bg-slate-900 border-r border-slate-700/50 flex-col min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-slate-700/50">
          <div className="text-blue-400 font-bold text-lg tracking-tight">Garmin Stats</div>
          <div className="mt-0.5 text-[10px] text-slate-600">v{APP_VERSION} · {APP_VERSION_NAME}</div>
          <div className="text-slate-500 text-xs mt-0.5">
            {activities.length > 0 ? `${activities.length} actividades` : 'Sin datos aún'}
          </div>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {NAV.map(({ to, label, Icon }) => (
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
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2.2} />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        {stats && (
          <div className="px-5 py-4 border-t border-slate-700/50">
            <div className="text-xs text-slate-500">Última sync</div>
            <div className="text-xs text-slate-400 mt-0.5">
              {new Date(stats.syncedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
            <div className="mt-3 text-xs text-slate-600 leading-relaxed">
              Auto-sync GitHub Actions
            </div>
          </div>
        )}
      </aside>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-slate-700/70 bg-slate-950 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-700" />

            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-blue-400 font-bold text-lg">Garmin Stats</div>
                <div className="mt-0.5 text-[10px] text-slate-600">v{APP_VERSION} · {APP_VERSION_NAME}</div>
                <div className="text-xs text-slate-500">
                  {activities.length > 0 ? `${activities.length} actividades` : 'Sin datos aún'}
                </div>
              </div>

              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-400 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-2">
              {MOBILE_MORE.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'border-blue-500/40 bg-blue-600/20 text-blue-300'
                        : 'border-slate-700/50 bg-slate-900/70 text-slate-300 hover:border-slate-500'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                  <span className="font-medium">{label}</span>
                </NavLink>
              ))}
            </div>

            {stats && (
              <div className="mt-4 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
                <div className="text-xs text-slate-500">Última sync</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {new Date(stats.syncedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700/70 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
        <div className="grid grid-cols-5 gap-1 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {MOBILE_MAIN.map(({ to, shortLabel, Icon }) => (
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
              <Icon className="h-5 w-5" strokeWidth={2.2} />
              <span className="truncate leading-none">{shortLabel}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] transition-colors ${
              menuOpen
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            <Menu className="h-5 w-5" strokeWidth={2.2} />
            <span className="truncate leading-none">Menú</span>
          </button>
        </div>
      </nav>
    </>
  )
}