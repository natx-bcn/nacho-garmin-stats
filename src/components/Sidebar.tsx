import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Activity,
  Award,
  BarChart3,
  CheckCircle2,
  Flame,
  Gauge,
  Home,
  Menu,
  Settings,
  Sparkles,
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

  const lastSync = stats?.syncedAt
    ? new Date(stats.syncedAt).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Pendiente'

  return (
    <>
      <aside className="hidden min-h-screen shrink-0 flex-col border-r border-white/10 bg-[#08111f] lg:sticky lg:top-0 lg:flex lg:w-64 xl:w-72">
        <div className="relative overflow-hidden border-b border-white/10 px-5 py-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_36%)]" />

          <div className="relative z-10">
            <SidebarLogo />

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              v{APP_VERSION}
            </div>

            <div className="mt-2 text-[11px] text-slate-500">{APP_VERSION_NAME}</div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                Biblioteca
              </div>
              <div className="mt-1 text-2xl font-black text-white">
                {activities.length}
              </div>
              <div className="text-xs text-slate-400">actividades sincronizadas</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 px-3 py-5">
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-sm transition-all duration-300 ${
                  isActive
                    ? 'border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 shadow-lg shadow-cyan-500/5'
                    : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-cyan-300 shadow-lg shadow-cyan-300/40" />
                  )}

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      isActive
                        ? 'bg-cyan-300/15 text-cyan-200'
                        : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-100'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.3} />
                  </span>

                  <span className="truncate font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-5">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Synced
            </div>

            <div className="mt-2 text-xs text-slate-400">Última sync</div>
            <div className="text-sm font-semibold text-white">{lastSync}</div>

            <div className="mt-3 text-xs leading-relaxed text-slate-500">
              Auto-sync GitHub Actions
            </div>
          </div>
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/10 bg-[#08111f] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-700" />

            <div className="mb-5 flex items-center justify-between">
              <SidebarLogo compact />

              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-slate-500">v{APP_VERSION} · {APP_VERSION_NAME}</div>
              <div className="mt-1 text-sm text-slate-300">
                {activities.length > 0 ? `${activities.length} actividades` : 'Sin datos aún'}
              </div>
            </div>

            <div className="grid gap-2">
              {MOBILE_MORE.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all ${
                      isActive
                        ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-slate-500'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                  <span className="font-medium">{label}</span>
                </NavLink>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Synced
              </div>
              <div className="mt-1 text-xs text-slate-400">Última sync: {lastSync}</div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#08111f]/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {MOBILE_MAIN.map(({ to, shortLabel, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] transition-all ${
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-200'
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
            className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] transition-all ${
              menuOpen
                ? 'bg-cyan-400/10 text-cyan-200'
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

function SidebarLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20 ${
          compact ? 'h-11 w-11' : 'h-13 w-13'
        }`}
      >
        <span className="text-lg font-black tracking-tighter text-white">GS</span>
        <div className="absolute inset-0 rounded-2xl border border-white/20" />
      </div>

      <div>
        <div className="text-lg font-black tracking-tight text-white">
          Garmin <span className="text-cyan-300">Stats</span>
        </div>

        {!compact && (
          <div className="text-xs text-slate-500">
            Performance Dashboard
          </div>
        )}
      </div>
    </div>
  )
}