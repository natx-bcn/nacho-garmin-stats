# Dashboard Hooks

Este documento resume los hooks que alimentan el Dashboard.

La idea es saber rápidamente qué datos ofrece cada hook para poder crear nuevas tarjetas, gráficos o métricas sin revisar todo el código.

---

# useFitnessHistory

## Función

Calcula o recupera la evolución del estado físico.

## Devuelve

* `current`
* `sparkPoints`

## Se usa para

* TSB
* CTL
* ATL
* Gráfica superior de Fitness / Fatiga

## Componentes relacionados

* Hero Header
* FormBadge
* RadialProgress
* RunnerStatusCard

---

# useWeekComparison

## Función

Compara la semana actual con la semana anterior.

## Devuelve

* `current`
* `previous`

## Se usa para

* TSS semanal
* Comparación de carga
* Recomendaciones del coach

## Componentes relacionados

* RunnerStatusCard
* CoachCard
* Weekly Load Chart

---

# useSportVolume

## Función

Calcula el volumen por deporte en un periodo determinado.

Actualmente se usa con 30 días.

## Devuelve

* `bySport`
* `totalHours`
* `percentages`

## Se usa para

* Volumen de running
* Volumen de ciclismo
* Volumen de natación
* Distribución porcentual

## Componentes relacionados

* Sport Volume Card

---

# useTrainingStreak

## Función

Calcula la racha activa de entrenamiento.

## Devuelve

* Número de días consecutivos con actividad.

## Se usa para

* Mostrar la racha en el Hero Header.

---

# useZoneDistribution

## Función

Calcula la distribución del tiempo en zonas de frecuencia cardíaca.

Actualmente se usa con 30 días.

## Devuelve

* `slices`
* `isAerobicFocused`

## Se usa para

* Gráfico radar de zonas FC.
* Mensaje de enfoque aeróbico.

## Componentes relacionados

* Heart Rate Zones Card
* CoachCard

---

# usePerformanceEngine

## Función

Motor de rendimiento del Dashboard.

## Devuelve

* `weeklyLoad`

## Se usa para

* Carga semanal TSS.
* Gráfico de 16 semanas.

## Componentes relacionados

* Weekly Load Chart

---

# Regla general

Si una nueva tarjeta necesita datos calculados, primero revisar estos hooks.

Si el cálculo ya existe, reutilizarlo.

Si el cálculo es nuevo pero puede servir a más componentes, crear o ampliar un hook.

Evitar meter cálculos complejos directamente en `Dashboard.tsx`.
