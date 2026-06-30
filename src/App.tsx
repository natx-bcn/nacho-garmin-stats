import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useActivityStore } from './stores/activityStore'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import ActivityDetailPage from './pages/ActivityDetail'
import FitnessChartPage from './pages/FitnessChartPage'
import ZoneAnalysis from './pages/ZoneAnalysis'
import Records from './pages/Records'
import Settings from './pages/Settings'
import PerformanceAnalysis from './pages/PerformanceAnalysis'

export default function App() {
  const loadActivities = useActivityStore((s) => s.loadActivities)
  const loadStats = useActivityStore((s) => s.loadStats)

  useEffect(() => {
    loadActivities()
    loadStats()
  }, [loadActivities, loadStats])

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#080f1e] text-slate-100 lg:flex">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activity/:id" element={<ActivityDetailPage />} />
            <Route path="/fitness" element={<FitnessChartPage />} />
            <Route path="/zones" element={<ZoneAnalysis />} />
            <Route path="/performance" element={<PerformanceAnalysis />} />
            <Route path="/records" element={<Records />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}