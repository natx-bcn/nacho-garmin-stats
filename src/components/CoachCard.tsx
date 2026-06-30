type CoachCardProps = {
  tsb: number
  weekCount: number
  weekDistance: number
  weekTss: number
  lastWeekTss: number
  isAerobicFocused: boolean
}

export default function CoachCard({
  tsb,
  weekCount,
  weekDistance,
  weekTss,
  lastWeekTss,
  isAerobicFocused,
}: CoachCardProps) {
  const messages = buildCoachMessages({
    tsb,
    weekCount,
    weekDistance,
    weekTss,
    lastWeekTss,
    isAerobicFocused,
  })

  return (
    <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">
            Coach crítico
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Lectura de la semana
          </h2>
        </div>

        <div className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
          Beta
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <div key={message.text} className="flex items-start gap-3">
            <span
              className="mt-1 h-2.5 w-2.5 rounded-full shrink-0"
              style={{
                background: message.color,
                boxShadow: `0 0 12px ${message.color}`,
              }}
            />
            <div>
              <div className="text-sm font-semibold text-slate-200">
                {message.title}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed mt-0.5">
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function buildCoachMessages({
  tsb,
  weekCount,
  weekDistance,
  weekTss,
  lastWeekTss,
  isAerobicFocused,
}: CoachCardProps) {
  const messages: Array<{
    title: string
    text: string
    color: string
  }> = []

  const loadRatio = lastWeekTss > 0 ? weekTss / lastWeekTss : 1

  if (weekCount >= 4) {
    messages.push({
      title: 'Buena constancia',
      text: `Llevas ${weekCount} sesiones esta semana. La regularidad está bien, pero no conviertas todos los días en días exigentes.`,
      color: '#22c55e',
    })
  } else if (weekCount >= 2) {
    messages.push({
      title: 'Semana correcta',
      text: `Llevas ${weekCount} sesiones. Vas sumando sin pasarte, buena base para construir.`,
      color: '#3b82f6',
    })
  } else {
    messages.push({
      title: 'Semana todavía floja',
      text: 'Aún hay poca carga registrada. Prioriza continuidad antes que intensidad.',
      color: '#eab308',
    })
  }

  if (loadRatio > 1.35) {
    messages.push({
      title: 'Ojo con la subida de carga',
      text: 'La carga semanal está subiendo demasiado respecto a la semana anterior. No añadiría series duras.',
      color: '#ef4444',
    })
  } else if (loadRatio > 1.15) {
    messages.push({
      title: 'Carga en aumento',
      text: 'La semana va por encima de la anterior. Bien si las piernas responden, pero controla gemelo, sóleo y aductores.',
      color: '#eab308',
    })
  } else {
    messages.push({
      title: 'Carga controlada',
      text: 'La progresión semanal está dentro de un rango razonable. Buen escenario para consolidar.',
      color: '#22c55e',
    })
  }

  if (tsb < -18) {
    messages.push({
      title: 'Fatiga alta',
      text: 'La forma está bastante negativa. Hoy no toca demostrar nada: descarga, movilidad o rodaje muy fácil.',
      color: '#ef4444',
    })
  } else if (tsb < -8) {
    messages.push({
      title: 'Fatiga moderada',
      text: 'Hay cansancio acumulado. Mejor una sesión fácil que forzar una calidad mediocre.',
      color: '#f97316',
    })
  } else if (tsb > 8) {
    messages.push({
      title: 'Buen margen para calidad',
      text: 'Estás relativamente fresco. Puedes meter calidad, pero manteniendo el control.',
      color: '#22c55e',
    })
  }

  if (!isAerobicFocused) {
    messages.push({
      title: 'Falta base aeróbica',
      text: 'El reparto por zonas sugiere que conviene meter más Z1/Z2. Para mejorar sin lesionarte, esto es clave.',
      color: '#eab308',
    })
  } else {
    messages.push({
      title: 'Buena base aeróbica',
      text: 'El reparto de zonas es saludable. Mantén ese trabajo fácil porque es lo que te permite asimilar la calidad.',
      color: '#22c55e',
    })
  }

  if (weekDistance > 0) {
    messages.push({
      title: 'Resumen práctico',
      text: `Esta semana llevas ${weekDistance.toFixed(1)} km. La prioridad debe ser llegar al domingo con piernas, no solo sumar por sumar.`,
      color: '#3b82f6',
    })
  }

  return messages.slice(0, 5)
}