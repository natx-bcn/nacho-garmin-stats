# ATHENA
## The Intelligence Engine of Garmin Stats

Version: 1.0
Status: Active Development

---

# Vision

Athena es el motor de inteligencia deportiva de Garmin Stats.

Garmin Stats visualiza datos.

Athena los interpreta.

Su objetivo no es mostrar métricas, sino ayudar al corredor a tomar mejores decisiones mediante análisis, predicción y recomendaciones personalizadas.

En el futuro Athena deberá ser completamente independiente de la interfaz de usuario.

El Dashboard es un cliente de Athena.

---

# Philosophy

Athena sigue cinco principios.

## 1. Single Source of Truth

Una decisión sólo puede calcularse en un lugar.

Nunca debe existir la misma lógica en Hero, Coach, RunnerStatus o cualquier otro componente.

---

## 2. Explainable Intelligence

Toda decisión debe poder responder:

- ¿Qué ha ocurrido?
- ¿Por qué?
- ¿Qué significa?
- ¿Qué debería hacer el usuario?

Athena nunca devolverá únicamente un número.

---

## 3. Modular Architecture

Cada analizador resuelve un único problema.

Nunca debe existir un analizador que haga varias cosas.

---

## 4. UI Agnostic

Athena no conoce React.

No conoce Tailwind.

No conoce componentes.

Sólo genera información.

---

## 5. Incremental Intelligence

Cada nueva versión añade nuevas capacidades sin romper las existentes.

---

# High Level Architecture

```
                    Garmin Stats

                     Dashboard
                         │
                         ▼
                  evaluateAthena()
                         │
                         ▼
                     ATHENA CORE
                         │
 ┌──────────┬──────────┬──────────┬──────────┐
 │          │          │          │
 ▼          ▼          ▼          ▼
Readiness  Coach   Insights   Predictions
```

---

# Athena Pipeline

```
Garmin Activities

        │

Metrics
CTL
ATL
TSB
Load
Recovery
History

        │

        ▼

Athena Context

        │

        ▼

Athena Engine

        │

        ▼

Analyzers

        │

        ▼

Athena Report

        │

        ▼

Dashboard
```

---

# Current Modules

## Readiness Analyzer

Responsabilidad

Determinar el estado general del corredor.

Produce

- Readiness Score
- Readiness Level
- Confidence
- Explanation

Consumido por

- Hero
- Coach
- Runner Status

---

## Training State Analyzer

Responsabilidad

Interpretar la fase del entrenamiento.

Ejemplos

- Building
- Productive
- Recovering
- Detraining

---

## Coach

Responsabilidad

Traducir el estado del corredor en una recomendación práctica.

Coach nunca debe recalcular métricas.

Debe interpretar Readiness.

---

# Planned Modules

## Insights Analyzer

Genera observaciones automáticas.

Ejemplos

- Tu carga ha aumentado un 18 %.
- Llevas cuatro semanas constantes.
- Tu fitness sigue creciendo.

---

## Trend Analyzer

Analiza tendencias.

- Fitness
- Fatiga
- CTL
- ATL
- TSB

---

## Fatigue Analyzer

Analiza fatiga acumulada.

No utiliza únicamente TSB.

También tendrá en cuenta:

- carga reciente
- continuidad
- recuperación

---

## Recovery Analyzer

Evalúa recuperación.

Futuro:

- HRV
- Sleep
- Rest Days

---

## Race Readiness

Calcula preparación para una carrera objetivo.

---

## Injury Risk

Detecta patrones compatibles con sobrecarga.

---

## Prediction Engine

Predice:

- evolución CTL
- evolución ATL
- evolución TSB

si el usuario mantiene el plan actual.

---

# Athena Report

Athena genera un único objeto.

```
AthenaReport

status

scores

coach

analysis

insights

predictions
```

Todos los componentes deben consumir únicamente este objeto.

Nunca deben recalcular información.

---

# Development Rules

## Añadir una nueva capacidad

Siempre:

1. Crear un nuevo Analyzer.
2. Integrarlo en runAthena().
3. Añadir el resultado a AthenaReport.
4. Consumirlo desde la UI.

Nunca añadir lógica directamente en un componente React.

---

## Component Rules

Los componentes sólo muestran información.

Nunca interpretan métricas.

Nunca calculan estados.

Nunca toman decisiones.

---

# Long Term Vision

Athena debe evolucionar hasta convertirse en un motor deportivo independiente.

En el futuro podrá alimentar:

- Garmin Stats
- Aplicación móvil
- Widgets
- API
- Chat deportivo
- Planificador de entrenamiento
- Predicción de carreras

Todo utilizando exactamente el mismo núcleo de inteligencia.

---

# Roadmap

## Phase 1

- Readiness
- Coach
- Training State

---

## Phase 2

- Insights
- Trends
- Predictions

---

## Phase 3

- Race Readiness
- Recovery
- Fatigue

---

## Phase 4

- Injury Risk
- Adaptive Training
- Goal Planning

---

# Design Goal

Athena no pretende reemplazar Garmin.

Pretende hacer comprensibles los datos que Garmin proporciona.

El éxito de Athena no se medirá por la cantidad de métricas que calcule.

Se medirá por la calidad de las decisiones que ayude a tomar.