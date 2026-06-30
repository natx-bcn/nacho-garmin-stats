import { useEffect, useState } from 'react'
import Card from './ui/Card'
import Button from './ui/Button'

type SyncCache = {
  lastSync: string | null
  lastActivityId: number | string | null
  totalActivities: number
  version: number
}

export default function SyncStatusCard() {
  const [cache, setCache] = useState<SyncCache | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/cache.json`)
      .then(r => r.ok ? r.json() : null)
      .then(setCache)
      .catch(() => setCache(null))
  }, [])

  const lastSyncLabel = cache?.lastSync
    ? new Date(cache.lastSync).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Sin datos'

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Sincronización
          </div>

          <h2 className="mt-1 text-2xl font-black text-slate-100">
            Garmin actualizado
          </h2>

          <div className="mt-2 text-sm text-slate-400">
            Última sync: <span className="text-slate-200">{lastSyncLabel}</span>
          </div>

          <div className="mt-1 text-sm text-slate-500">
            Actividades: {cache?.totalActivities ?? '–'}
          </div>
        </div>

        <a
          href="https://github.com/natx-bcn/nacho-garmin-stats/actions/workflows/update-garmin.yml"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="primary">
            Actualizar ahora
          </Button>
        </a>
      </div>
    </Card>
  )
}