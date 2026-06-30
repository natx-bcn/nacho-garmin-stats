# Athena Architecture

## Objetivo

Athena es la capa de inteligencia del proyecto Garmin Stats.

Su responsabilidad es transformar datos deportivos en análisis, estados, recomendaciones, predicciones e insights útiles para el usuario.

## Principios

- El Dashboard no calcula inteligencia.
- Los componentes solo consumen resultados.
- Athena concentra análisis, scoring, predicción y mensajes.
- La arquitectura debe permitir crecer sin romper la UI.
- Cada módulo debe tener una responsabilidad clara.

## Estructura

```text
src/lib/athena
├── analyzer
├── coach
├── insights
├── predictor
├── scoring
├── models
├── types
├── utils
└── index.ts

Activities / Metrics
        ↓
Athena Analyzer
        ↓
Athena Scoring
        ↓
Athena Coach
        ↓
Athena Insights
        ↓
Dashboard

Roadmap
v5.6 Athena Foundation
Crear arquitectura base.
Exponer API pública desde src/lib/athena.
Redirigir CoachCard hacia Athena.
Migrar progresivamente lógica de src/lib/coach.
Futuro
Readiness Score.
Training Balance.
Risk Detection.
Race Predictions.
Weekly Intelligence.
Personalized Recommendations.

