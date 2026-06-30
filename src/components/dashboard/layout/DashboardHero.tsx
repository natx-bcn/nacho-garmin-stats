import { PageHeader } from '../../ui/PageHeader'

type DashboardHeroProps = {
  totalActivities: number
}

export function DashboardHero({
  totalActivities,
}: DashboardHeroProps) {
  return (
    <PageHeader
      eyebrow="Garmin Analytics"
      title="Dashboard"
      subtitle={`${totalActivities} actividades analizadas • Datos sincronizados con Garmin`}
    />
  )
}