# Athena v1 Architecture

## Objetivo

Athena es el motor de inteligencia deportiva de Garmin Stats.

Su objetivo es transformar datos de entrenamiento en análisis, estados, scores, insights, recomendaciones y predicciones reutilizables por cualquier interfaz.

La interfaz React no debe calcular inteligencia. Solo debe presentar resultados.

---

## Principios

- Athena es independiente de React.
- Todos los analizadores reciben `AthenaContext`.
- `evaluateAthena(context)` es la API pública principal.
- `runAthena(context)` orquesta el motor.
- `AthenaReport` es el contrato estable de salida.
- Ningún componente debe interpretar CTL, ATL, TSB o TSS directamente.
- El Coach no calcula métricas: interpreta análisis.
- Los componentes solo renderizan datos.

---

## Flujo de datos

```text
Garmin Data
    ↓
AthenaContext
    ↓
Athena Engine
    ↓
Analyzers
    ↓
Scores
    ↓
Insights
    ↓
Coach
    ↓
AthenaReport
    ↓
Dashboard / UI


Estructura

src/lib/athena
├── analyzer
│   ├── statusAnalyzer.ts
│   ├── readinessAnalyzer.ts
│   └── trainingStateAnalyzer.ts
│
├── coach
│
├── engine
│   └── runAthena.ts
│
├── insights
│
├── models
│   ├── AthenaContext.ts
│   ├── AthenaReport.ts
│   ├── AthenaStatus.ts
│   ├── AthenaScores.ts
│   └── AthenaAnalysis.ts
│
├── predictor
├── rules
├── scoring
├── types
├── utils
├── evaluateAthena.ts
└── index.ts

Contratos principales
AthenaContext

Entrada única del motor.

Debe contener los datos necesarios para que Athena pueda analizar el estado deportivo del usuario.

Ejemplos actuales:

ctl
atl
tsb
weeklyLoad
lastWeekLoad
weekDistance
activitiesThisWeek
isAerobicFocused
daysSinceLastActivity
AthenaReport

Salida estable del motor.

AthenaReport {
  status
  scores
  analysis
  coach
  insights
  predictions
}
Responsabilidades
analyzer

Interpreta datos deportivos.

Ejemplos:

estado del corredor
readiness
training state
recuperación
riesgo de lesión
tendencia
carga

Todos los analyzers deben recibir:

AthenaContext
engine

Orquesta Athena.

No contiene UI.

No pinta componentes.

No conoce React.

coach

Convierte análisis en mensajes humanos.

El coach no debe recalcular métricas deportivas.

scoring

Calcula scores propios de Athena.

Ejemplos futuros:

Training Score
Recovery Score
Consistency Score
Fitness Score
insights

Genera textos inteligentes reutilizables.

Ejemplos:

resumen semanal
alertas
recomendaciones
logros
tendencias
predictor

Genera predicciones.

Ejemplos futuros:

5K
10K
media maratón
maratón
riesgo de lesión
preparación para récord personal
Regla clave

Cualquier lógica de negocio deportiva debe vivir en Athena.

No debe vivir en:

componentes React
páginas
tarjetas visuales
hooks de UI

Roadmap
v5.7
Consolidar AthenaContext.
Consolidar AthenaReport.
Extraer lógica desde RunnerStatusCard.
Integrar componentes principales con Athena.
v5.8
Recovery Analyzer.
Load Analyzer.
Injury Risk Analyzer.
Recommendation Engine.
v5.9
Scores propios.
Insights semanales.
Mejor integración con Dashboard.
v6.0
Athena como motor independiente.
Predicciones.
AI Coach.
Planificación inteligente.

