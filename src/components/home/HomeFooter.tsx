import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import Panel from '../ui/Panel'

export default function HomeFooter() {
  return (
    <Panel
      variant="subtle"
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
        ¿Quieres profundizar?
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white">
        Explora todos tus análisis
      </h3>

      <p className="mt-2 max-w-xl text-slate-400">
        Fitness, rendimiento, zonas y evolución siguen disponibles con todo el detalle.
      </p>

      <Link
        to="/performance"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
      >
        Abrir Performance
        <ArrowRight size={16} />
      </Link>
    </Panel>
  )
}