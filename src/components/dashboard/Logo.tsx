export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20">
        <span className="text-xl font-black tracking-tighter text-white">GS</span>
        <div className="absolute inset-0 rounded-2xl border border-white/20" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Garmin <span className="text-cyan-300">Stats</span>
        </h1>
        <p className="text-sm text-slate-400">
          Personal Performance Dashboard
        </p>
      </div>
    </div>
  )
}