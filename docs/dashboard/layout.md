# Dashboard Layout

## Objetivo

El Dashboard está organizado para que la información más importante aparezca primero y el usuario pueda entender su estado deportivo en pocos segundos.

La estructura sigue una jerarquía clara: **estado actual → recomendaciones → análisis → histórico**.

---

# Estructura

```text
Dashboard
│
├── Hero Header
│   ├── Estado de forma (TSB)
│   ├── VO2max
│   ├── Fitness (CTL)
│   ├── Fatiga (ATL)
│   ├── Racha de entrenamiento
│   ├── Nº de actividades
│   └── Sparkline CTL / ATL
│
├── Runner Status Card
│
├── Coach Card
│
├── Weekly Goals Card
│
├── Race Predictions Card
│
├── Weekly Calendar Card
│
├── Training Summary Card
│
├── Tendencias
│   ├── Trend Card
│   └── Consistency Card
│
├── Carga semanal (TSS)
│
├── Análisis
│   ├── Volumen últimos 30 días
│   └── Distribución zonas FC
│
├── Últimas actividades
│
└── Sync Status Card
```

---

# Orden de lectura

El usuario debería recorrer el dashboard en este orden:

1. Estado físico actual.
2. Recomendaciones.
3. Objetivos.
4. Predicciones.
5. Resumen semanal.
6. Tendencias.
7. Evolución de la carga.
8. Distribución del entrenamiento.
9. Historial reciente.
10. Estado de sincronización.

---

# Hero Header

Es la parte más importante del dashboard.

Contiene:

* Estado de forma (TSB).
* VO2max.
* Fitness (CTL).
* Fatiga (ATL).
* Racha de entrenamiento.
* Número total de actividades.
* Fecha de la última sincronización.
* Evolución CTL / ATL mediante una gráfica tipo sparkline.

Debe ocupar la parte superior de la pantalla y ofrecer una visión inmediata del estado deportivo.

---

# Zona de análisis

Después del Hero aparecen varias tarjetas orientadas al análisis:

* Estado del corredor.
* Recomendaciones del entrenador.
* Objetivos semanales.
* Predicción de tiempos de carrera.
* Calendario semanal.
* Resumen de entrenamiento.

Estas tarjetas aportan contexto antes de mostrar los gráficos.

---

# Tendencias

Dos tarjetas independientes muestran:

* Evolución reciente.
* Consistencia del entrenamiento.

Estas tarjetas forman un bloque común y deben mantenerse visualmente equilibradas.

---

# Análisis gráfico

El dashboard incorpora varios gráficos:

* Evolución de CTL y ATL.
* Carga semanal (TSS).
* Volumen por deporte (30 días).
* Distribución por zonas de frecuencia cardíaca.

Cada gráfico responde a una pregunta concreta y evita duplicar información.

---

# Actividad reciente

La parte inferior muestra las últimas actividades registradas.

Cada actividad presenta:

* Nombre.
* Antigüedad (Hoy, Ayer, Hace X días).
* Tipo de deporte.
* Distancia.
* Ritmo o velocidad.
* Duración.
* Frecuencia cardíaca media (si existe).
* TSS (si existe).

Cada elemento enlaza con el detalle de la actividad.

---

# Estado de sincronización

El dashboard finaliza mostrando el estado de sincronización con Garmin.

Este componente sirve como referencia técnica y confirma que los datos mostrados están actualizados.

---

# Filosofía del layout

El dashboard sigue estos principios:

* Mostrar primero lo importante.
* Reducir el ruido visual.
* Agrupar información relacionada.
* Alternar tarjetas y gráficos para mejorar la lectura.
* Mantener un equilibrio entre información y espacio en blanco.
* Facilitar futuras ampliaciones sin rediseñar toda la pantalla.

---

# Próximas mejoras

* Hacer el Hero aún más visual.
* Incorporar indicadores de mejora/empeoramiento respecto a la semana anterior.
* Añadir microanimaciones en métricas clave.
* Permitir ocultar o reordenar tarjetas en futuras versiones.
