# Garmin Activities — Project Context

## 1. Qué es Garmin Activities

Garmin Activities es una aplicación web personal para visualizar, analizar y entender actividades deportivas exportadas desde Garmin.

El objetivo principal del proyecto es transformar datos deportivos en información útil, visual y accionable.

No se trata solo de mostrar kilómetros, ritmos o pulsaciones. La idea es construir un dashboard que ayude a responder preguntas como:

* ¿Estoy entrenando con regularidad?
* ¿Estoy mejorando?
* ¿Estoy acumulando demasiada fatiga?
* ¿Qué tipo de actividades hago más?
* ¿Cómo evoluciona mi volumen semanal?
* ¿Cuáles son mis mejores marcas?
* ¿Qué tendencias aparecen en mis entrenamientos?
* ¿Estoy equilibrando bien running, fuerza, padbol y recuperación?

El proyecto nace como una herramienta personal, pero se desarrolla con una estructura suficientemente limpia como para poder evolucionar hacia una aplicación más completa.

---

## 2. Filosofía del proyecto

La filosofía de Garmin Activities es clara:

1. Simplicidad visual.
2. Métricas útiles.
3. Diseño profesional.
4. Código mantenible.
5. Datos locales y controlados.
6. Evolución progresiva.
7. Evitar complejidad innecesaria.

La aplicación debe ser rápida, clara y agradable de usar.

Cada nueva métrica o componente debe aportar valor real. Si una gráfica no ayuda a entender mejor el entrenamiento, no debe estar en el dashboard principal.

---

## 3. Estado actual del proyecto

El proyecto ya cuenta con una base funcional en React + Vite + TypeScript.

Actualmente existe un dashboard principal con componentes visuales orientados a mostrar resumen, actividad reciente, tendencias y evolución deportiva.

La aplicación está publicada mediante GitHub Pages.

El flujo actual se apoya en archivos JSON generados a partir de datos de Garmin y consumidos por el frontend.

---

## 4. Stack tecnológico

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Recharts
* Lucide React

### Build y despliegue

* GitHub Actions
* GitHub Pages

### Datos

* Archivos JSON generados desde actividades Garmin.
* Datos consumidos directamente por el frontend.

---

## 5. Arquitectura general

La arquitectura actual es simple y efectiva:

```text
Garmin
  ↓
Exportación / sincronización de actividades
  ↓
Generación de archivos JSON
  ↓
Repositorio GitHub
  ↓
Build con Vite
  ↓
Deploy en GitHub Pages
  ↓
Dashboard web
```

El frontend no depende todavía de una API propia.

La aplicación lee datos estáticos generados previamente. Esto facilita el despliegue, reduce costes y evita tener que mantener un backend desde el inicio.

---

## 6. Principios de arquitectura

### Mantener el frontend limpio

El frontend debe encargarse principalmente de:

* Visualizar datos.
* Calcular métricas ligeras.
* Mostrar gráficas.
* Ofrecer una experiencia clara.

No debería contener lógica excesivamente compleja de procesamiento de datos si esa lógica puede prepararse previamente durante la generación de JSON.

### Separar datos, métricas y presentación

Siempre que sea posible:

* Los datos brutos deben vivir separados.
* Las funciones de cálculo deben estar en utilidades.
* Los componentes visuales deben limitarse a renderizar información.

### Evolución incremental

No se debe intentar construir todo de golpe.

El proyecto debe avanzar por versiones pequeñas, estables y documentadas.

---

## 7. Estructura documental

La documentación vive dentro de la carpeta:

```text
docs/
```

La estructura principal es:

```text
docs/
├── 01-project/
├── 02-architecture/
├── 03-data/
├── 04-frontend/
├── 05-backend/
├── 06-features/
├── 07-development/
└── assets/
```

Cada bloque tiene una responsabilidad clara.

---

## 8. Documentos principales

### project-context.md

Documento principal del proyecto.

Sirve como memoria global y punto de entrada para entender Garmin Activities.

### vision.md

Describe la visión del producto, sus objetivos y su filosofía.

### roadmap.md

Contiene la evolución prevista por versiones.

### changelog.md

Recoge los cambios relevantes realizados en cada versión.

### decisions.md

Registra decisiones importantes de diseño, arquitectura y producto.

### architecture.md

Explica cómo funciona técnicamente el sistema.

### dashboard.md

Documenta el dashboard principal, sus secciones y componentes.

### metrics.md

Define las métricas deportivas utilizadas en la aplicación.

### github-actions.md

Explica los workflows de automatización y despliegue.

### troubleshooting.md

Recoge errores comunes y cómo solucionarlos.

---

## 9. Dashboard actual

El dashboard está evolucionando hacia un diseño más profesional, denominado internamente como Dashboard PRO Layout.

El objetivo del dashboard es ofrecer una visión rápida y clara del estado deportivo actual.

Debe incluir, progresivamente:

* Resumen general.
* Actividades recientes.
* Volumen semanal.
* Distancia total.
* Tiempo total.
* Tendencias.
* Consistencia.
* Carga de entrenamiento.
* Mejores marcas.
* Distribución por tipo de actividad.
* Evolución mensual.
* Métricas de recuperación.
* Indicadores visuales de progreso.

---

## 10. Criterios para añadir componentes

Antes de añadir un nuevo componente al dashboard hay que preguntarse:

1. ¿Aporta información útil?
2. ¿Es fácil de entender?
3. ¿Ayuda a tomar mejores decisiones de entrenamiento?
4. ¿Encaja visualmente con el resto del dashboard?
5. ¿Se puede mantener fácilmente?
6. ¿Está basado en datos fiables?

Si la respuesta no es clara, el componente debe ir primero a una sección secundaria o al backlog.

---

## 11. Métricas previstas

Algunas métricas previstas o ya planteadas:

* Distancia total.
* Tiempo total.
* Número de actividades.
* Desnivel positivo.
* Ritmo medio.
* Frecuencia cardíaca media.
* Frecuencia cardíaca máxima.
* Carga semanal.
* Consistencia semanal.
* Tendencia de volumen.
* Fatiga estimada.
* Recuperación estimada.
* Mejores marcas personales.
* Comparativa mensual.
* Distribución por deporte.
* Evolución de running.
* Evolución de fuerza.
* Evolución de padbol.

---

## 12. Futuras mejoras

Ideas importantes para futuras versiones:

* Botón “Actualizar ahora”.
* Backend seguro con Cloudflare Worker o Firebase Function.
* Sync Center.
* Estado de sincronización.
* Historial de sincronizaciones.
* Progreso de actualización.
* Mejor análisis de carga.
* Métricas de fatiga.
* Métricas de recuperación.
* Página individual por actividad.
* Comparador de periodos.
* Objetivos deportivos.
* Alertas de sobrecarga.
* Exportación de informes.
* Modo móvil optimizado.
* Sistema de versiones visuales del dashboard.

---

## 13. Botón “Actualizar ahora”

Como mejora futura, se quiere crear un botón “Actualizar ahora” desde la web.

Este botón debería lanzar el workflow de GitHub Actions o un proceso de sincronización equivalente.

No se deben exponer tokens ni secretos en el frontend.

La opción preferente será usar un backend seguro, por ejemplo:

* Cloudflare Worker
* Firebase Function
* Otro endpoint backend protegido

Este sistema podría evolucionar más adelante hacia un Sync Center con:

* Estado actual.
* Última sincronización.
* Historial.
* Progreso.
* Errores.
* Reintentos.
* Logs simplificados.

---

## 14. GitHub Actions

GitHub Actions se utiliza para automatizar procesos del proyecto.

Actualmente es una pieza clave para:

* Construir la aplicación.
* Validar TypeScript.
* Ejecutar Vite build.
* Publicar en GitHub Pages.

Cuando falla el build, normalmente se debe revisar:

* Errores de TypeScript.
* Imports incorrectos.
* Archivos no subidos al repositorio.
* Rutas relativas mal escritas.
* Componentes inexistentes.
* Dependencias no instaladas.
* Problemas de configuración de Vite.

---

## 15. Reglas de desarrollo

### Antes de hacer push

Ejecutar:

```bash
npm run build
```

Si el build falla en local, no hacer push.

### Antes de crear componentes nuevos

Comprobar:

* Nombre correcto del archivo.
* Export correcto.
* Import correcto.
* Ubicación correcta.
* Tipos TypeScript correctos.

### Después de cambios grandes

Actualizar documentación relacionada.

---

## 16. Convenciones de componentes

Los componentes deben tener nombres claros y descriptivos.

Ejemplos:

```text
TrainingSummaryCard.tsx
TrendCard.tsx
ConsistencyCard.tsx
ActivityTypeChart.tsx
WeeklyVolumeChart.tsx
PersonalRecordsCard.tsx
```

Los componentes tipo tarjeta deberían mantener una estética coherente:

* Bordes redondeados.
* Espaciado cómodo.
* Jerarquía visual clara.
* Títulos descriptivos.
* Datos principales visibles.
* Texto secundario discreto.
* Buen comportamiento responsive.

---

## 17. Convenciones visuales

La interfaz debe transmitir una sensación de producto premium deportivo.

Estilo deseado:

* Profesional.
* Limpio.
* Moderno.
* Deportivo.
* Oscuro.
* Elegante.
* Con buenas tarjetas.
* Con métricas fáciles de leer.
* Sin saturar el dashboard.

Evitar:

* Gráficas innecesarias.
* Exceso de colores.
* Métricas sin explicación.
* Componentes duplicados.
* Tarjetas que no aportan valor.
* Textos demasiado largos dentro del dashboard.

---

## 18. Prioridades actuales

Prioridades inmediatas del proyecto:

1. Estabilizar el Dashboard PRO Layout.
2. Documentar la estructura del proyecto.
3. Definir métricas principales.
4. Revisar componentes existentes.
5. Mejorar visualización de datos.
6. Consolidar el flujo de build y deploy.
7. Mantener documentación actualizada.

---

## 19. Roadmap inicial

### V5.3.1 — Dashboard PRO Layout

Objetivo:

* Rediseñar el dashboard principal.
* Mejorar jerarquía visual.
* Añadir tarjetas profesionales.
* Incorporar métricas de tendencia y consistencia.
* Dejar una base sólida para futuras métricas.

### V5.4

Objetivo previsto:

* Mejorar gráficas.
* Añadir documentación completa de componentes.
* Revisar responsive.
* Pulir estados vacíos y errores.

### V5.5

Objetivo previsto:

* Métricas avanzadas.
* Mejores marcas.
* Evolución mensual.
* Comparativas.

### V6

Objetivo previsto:

* Página individual de actividad.
* Navegación más completa.
* Filtros.
* Análisis por deporte.

### V7

Objetivo previsto:

* Backend seguro.
* Botón “Actualizar ahora”.
* Sync Center.
* Automatización avanzada.

---

## 20. Criterios de calidad

El proyecto debe cumplir estos criterios:

* El build debe pasar siempre.
* El dashboard debe cargar rápido.
* La estructura debe ser entendible.
* Los nombres deben ser claros.
* Las métricas deben estar documentadas.
* Los componentes deben ser reutilizables.
* El diseño debe ser responsive.
* Los errores deben estar documentados.
* Las decisiones importantes deben quedar registradas.

---

## 21. Cómo usar esta documentación

Cuando se retome el proyecto después de varios días o semanas, este documento debe leerse primero.

Después, según la tarea, consultar:

* `dashboard.md` para cambios visuales.
* `metrics.md` para cálculos.
* `architecture.md` para estructura técnica.
* `roadmap.md` para planificación.
* `troubleshooting.md` para errores.
* `decisions.md` para entender decisiones pasadas.

---

## 22. Nota de mantenimiento

Este documento debe mantenerse vivo.

Cada vez que cambie de forma importante la arquitectura, el dashboard, las métricas o el roadmap, se debe actualizar.

No tiene que ser perfecto, pero sí útil.

La documentación debe ayudar a desarrollar mejor, no convertirse en una carga.
