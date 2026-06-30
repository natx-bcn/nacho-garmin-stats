type RawActivity = {
  sport: string
  distance: number
  duration: number
  avgHR?: number | null
  avgPace?: number | null
  tss?: number | null
}

export function calculateIntensity(activity: RawActivity) {
  const durationMin = activity.duration / 60
  const avgHR = activity.avgHR ?? 0
  const tss = activity.tss ?? 0

  let score = 30

  if (activity.sport === 'running') {
    score += Math.min(durationMin / 2, 25)

    if (avgHR > 0) {
      if (avgHR >= 166) score += 35
      else if (avgHR >= 158) score += 28
      else if (avgHR >= 148) score += 18
      else if (avgHR >= 135) score += 10
      else score += 4
    }

    score += Math.min(tss / 3, 25)
  } else {
    score += Math.min(durationMin / 3, 20)
    score += Math.min(tss / 2.5, 30)
  }

  return clamp(Math.round(score), 0, 100)
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}