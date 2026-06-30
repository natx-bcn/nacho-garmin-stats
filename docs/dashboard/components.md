# Dashboard Components

Este documento describe los componentes que forman el Dashboard principal.

Su objetivo es saber rápidamente qué hace cada componente, qué información muestra y dónde puede evolucionar.

---

# Dashboard.tsx

## Responsabilidad

Es el componente principal del Dashboard.

No contiene lógica de negocio compleja.

Su función es:

* Obtener los datos desde los stores y hooks.
* Organizar el layout.
* Renderizar los componentes.

Debe mantenerse lo más limpio posible.

---

# RunnerStatusCard

## Función

Resume el estado físico actual del corredor.

## Información

* TSB
* CTL
* ATL
* TSS semanal
* Comparación con la semana anterior

## Futuras mejoras

* Indicador visual de mejora.
* Historial de estados.
* Riesgo de sobreentrenamiento.

---

# CoachCard

## Función

Genera recomendaciones automáticas.

## Información

Utiliza:

* Estado de forma.
* Volumen semanal.
* TSS.
* Enfoque aeróbico.

## Futuras mejoras

* IA con recomendaciones más avanzadas.
* Recomendaciones por objetivo.
* Alertas personalizadas.

---

# WeeklyGoalsCard

## Función

Muestra el progreso de los objetivos semanales.

## Futuras mejoras

* Objetivos configurables.
* Objetivos mensuales.
* Sistema de logros.

---

# RacePredictionsCard

## Función

Predicción de tiempos de carrera.

## Futuras mejoras

* Más distancias.
* Evolución histórica.
* Comparación con resultados reales.

---

# WeeklyCalendarCard

## Función

Visualiza la distribución semanal de actividades.

## Futuras mejoras

* Colores por intensidad.
* Entrenos planificados.
* Días de descanso.

---

# TrainingSummaryCard

## Función

Resume el entrenamiento reciente.

## Futuras mejoras

* Comparativa semanal.
* Comparativa mensual.
* Insights automáticos.

---

# TrendCard

## Función

Analiza la tendencia del entrenamiento.

## Futuras mejoras

* Tendencia de carga.
* Tendencia de ritmo.
* Tendencia de frecuencia cardíaca.
* Tendencia de volumen.

---

# ConsistencyCard

## Función

Analiza la regularidad del entrenamiento.

## Futuras mejoras

* Consistencia mensual.
* Consistencia anual.
* Índice de adherencia.
* Calendario tipo GitHub.

---

# Weekly Load Chart

## Función

Representa la evolución del TSS de las últimas semanas.

## Información

* TSS semanal.
* Semana actual destacada.

## Futuras mejoras

* Media móvil.
* Objetivo semanal.
* Alertas de sobrecarga.

---

# Sport Volume

## Función

Distribuye el volumen por deporte.

Actualmente muestra:

* Running
* Ciclismo
* Natación

## Futuras mejoras

* Padbol.
* Fuerza.
* Senderismo.
* Otros deportes Garmin.

---

# Heart Rate Zones

## Función

Distribución del tiempo en zonas de frecuencia cardíaca.

## Futuras mejoras

* Evolución por semanas.
* Comparación entre meses.
* Distribución por deporte.

---

# Recent Activities

## Función

Lista las actividades más recientes.

Cada actividad muestra:

* Nombre.
* Deporte.
* Distancia.
* Ritmo o velocidad.
* Duración.
* Frecuencia cardíaca.
* TSS.

Cada elemento enlaza al detalle de la actividad.

---

# SyncStatusCard

## Función

Indica el estado de sincronización con Garmin.

## Futuras mejoras

* Última sincronización relativa.
* Historial.
* Botón "Actualizar ahora".
* Estado del workflow.

---

# Regla de diseño

Todos los componentes del Dashboard deben cumplir estas normas:

* Una única responsabilidad.
* Reutilizables.
* Independientes.
* Responsive.
* Consistentes visualmente.
* Sin lógica de negocio compleja.
* Toda la lógica debe vivir en hooks o utilidades cuando sea posible.

---

# Convención

Antes de crear un nuevo componente debemos preguntarnos:

* ¿Aporta información nueva?
* ¿Puede reutilizarse?
* ¿Tiene sentido como tarjeta independiente?
* ¿Debe formar parte del Dashboard principal o de una vista secundaria?
