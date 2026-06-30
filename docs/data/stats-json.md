# stats.json

## Objetivo

`stats.json` es el archivo principal consumido por el Dashboard.

Contiene las estadísticas agregadas del usuario y evita tener que recalcular información cada vez que se carga la aplicación.

El Dashboard debe intentar obtener toda la información posible desde este archivo.

---

# Filosofía

`stats.json` debe contener únicamente datos agregados o precalculados.

No debe almacenar actividades completas.

Las actividades individuales pertenecen a sus respectivos archivos `activity_xxxxx.json`.

---

# Información que contiene

Actualmente el Dashboard utiliza información como:

* Número total de actividades.
* Fecha de la última sincronización.
* Historial de VO2max.
* Estadísticas generales.
* Métricas de rendimiento.

Además, distintos hooks generan métricas derivadas a partir de estos datos.

---

# Datos utilizados por el Dashboard

## Estado físico

* Fitness (CTL)
* Fatiga (ATL)
* Estado de forma (TSB)

---

## Entrenamiento

* TSS semanal
* Evolución semanal
* Carga acumulada

---

## Rendimiento

* VO2max
* Predicciones de carrera
* Tendencias

---

## Actividad

* Total de actividades
* Última sincronización
* Resúmenes generales

---

# Buenas prácticas

Siempre que una métrica sea costosa de calcular, debe generarse durante la sincronización y almacenarse en `stats.json`.

El frontend debe centrarse en visualizar datos, no en realizar cálculos complejos.

---

# Futuras ampliaciones

En próximas versiones podrían añadirse campos como:

* Récords personales.
* Mejor semana.
* Mejor mes.
* Rachas históricas.
* Distribución anual.
* Historial de carga.
* Resumen por deporte.
* Objetivos.
* Logros.
* Recuperación estimada.
* Fatiga acumulada.
* Índice de consistencia.

---

# Regla

Antes de crear una nueva tarjeta del Dashboard debemos comprobar:

1. ¿El dato ya existe en `stats.json`?
2. ¿Puede calcularse durante la sincronización?
3. ¿Es mejor calcularlo en el frontend?

Siempre que sea posible, la respuesta debería ser la segunda opción.

---

# Pendiente de documentar

Más adelante completaremos este documento con el esquema completo del archivo `stats.json`, indicando:

* Nombre del campo.
* Tipo.
* Descripción.
* Componente que lo utiliza.
* Hook relacionado.
* Origen del dato.

Ese será el documento de referencia para cualquier nueva funcionalidad del Dashboard.
