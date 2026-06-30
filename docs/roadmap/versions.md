# Versions

## V5.3.1 — Dashboard PRO Layout

Fecha: 2026-06-30

### Añadido

- Documentación ligera del Dashboard.
- `dashboard.md`
- `layout.md`
- `components.md`
- `hooks.md`
- `stats-json.md`
- `next-steps.md`
- `ideas.md`

### Mejorado

- Estructura mínima de documentación orientada al desarrollo del Dashboard.

### Corregido

- Componentes del Dashboard sincronizados con GitHub.
- Build de GitHub Actions tras añadir `TrendCard` y `ConsistencyCard`.

---

## V5.4.0 — Performance Intelligence

Estado: Pendiente

### Objetivo

Mejorar el Dashboard con métricas más útiles, mejor jerarquía visual e insights de rendimiento.

### Previsto

- Hero Header 2.0.
- PersonalRecordsCard.
- WeeklyInsightsCard.
- Mejora del gráfico de carga semanal TSS.
- Revisión responsive móvil.


---

## V5.4.0 — Performance Intelligence

Estado: 🚧 En desarrollo

### Objetivo

Rediseñar el Dashboard para convertirlo en un panel más inteligente, visual y motivador.

### Roadmap

- Hero 2.0
- Weekly Insights
- Personal Records
- Dashboard Polish
- Layout Review

---

# v5.5.0 — Design System & Insight Engine Foundation

## Estado
En desarrollo — rama `feature/dashboard-pro-header`

## Objetivo
Crear la base visual y analítica de Garmin Stats para evolucionar el dashboard hacia una experiencia más profesional e inteligente.

## Cambios principales

### Design System
- Añadido `GlassCard`.
- Añadido `MetricCard`.
- Añadido `Section`.
- Añadido `PageHeader`.
- Añadido `DashboardTitle`.
- Añadido `TrendBadge`.

### Motion System
- Instalado `framer-motion`.
- Añadido `src/lib/motion/animations.ts`.
- Animaciones base:
  - `fadeIn`
  - `slideUp`
  - `staggerContainer`
  - `cardHover`
  - `softTap`
  - `metricPulse`

### Analysis Engine
- Añadido `executiveSummary.ts`.
- Añadido `insightEngine.ts`.
- Generación inicial de insights automáticos:
  - carga en aumento
  - semana de descarga
  - recuperación insuficiente
  - buena consistencia

### Dashboard
- Añadido `InsightsPanel`.
- Integrado `InsightsPanel` en el Dashboard.
- Primer paso para convertir Garmin Stats en una herramienta de interpretación inteligente, no solo visualización de métricas.

## Próximo paso
Conectar el `InsightEngine` con datos reales avanzados:
- zonas de frecuencia cardíaca
- ritmo
- carga semanal
- CTL / ATL / TSB
- tendencias de volumen
- consistencia
- recomendaciones automáticas