# Dashboard

## Objetivo

El Dashboard es la pantalla principal de Garmin Activities.

Su objetivo es ofrecer una visión clara, rápida y visual del estado deportivo del usuario sin necesidad de navegar por distintas pantallas.

Debe responder, de un vistazo, a preguntas como:

* ¿Cómo estoy entrenando?
* ¿Estoy mejorando?
* ¿Entreno con regularidad?
* ¿Qué volumen llevo?
* ¿Cómo evoluciona mi rendimiento?
* ¿Qué actividad predomina?
* ¿Hay alguna tendencia positiva o negativa?

---

# Filosofía

El dashboard debe ser:

* Muy visual.
* Rápido de interpretar.
* Profesional.
* Moderno.
* Deportivo.
* Responsive.
* Oscuro (Dark Theme).
* Basado en tarjetas ("cards").

Cada tarjeta debe aportar información útil. Si una tarjeta no ayuda a tomar decisiones o entender mejor el entrenamiento, debe eliminarse o trasladarse a una vista secundaria.

---

# Organización

El dashboard se compone de diferentes bloques funcionales.

## 1. Hero Section

Resumen inmediato del estado actual.

Debe contener las métricas más importantes del usuario.

Ejemplos:

* Distancia total.
* Tiempo total.
* Actividades.
* Ritmo medio.
* Desnivel.
* Carga de entrenamiento.

---

## 2. Resumen de entrenamiento

Información agregada del periodo actual.

Ejemplos:

* Semana.
* Mes.
* Últimos 30 días.
* Comparativa con el periodo anterior.

---

## 3. Evolución

Gráficas que muestran la evolución del entrenamiento.

Ejemplos:

* Distancia semanal.
* Tiempo semanal.
* Actividades por semana.
* Evolución mensual.

---

## 4. Tendencias

Tarjetas destinadas a detectar patrones.

Ejemplos:

* Tendencia positiva.
* Tendencia negativa.
* Regularidad.
* Incremento de carga.

---

## 5. Distribución

Cómo se reparte el entrenamiento.

Ejemplos:

* Running.
* Padbol.
* Fuerza.
* Ciclismo.
* Senderismo.

---

## 6. Insights

Conclusiones automáticas generadas a partir de las métricas.

Ejemplos:

* Has entrenado más que la semana pasada.
* Tu volumen está aumentando.
* Llevas varios días sin descansar.
* Estás siendo muy constante.

---

# Diseño

El diseño debe transmitir sensación de aplicación deportiva premium.

Principios:

* Mucho espacio en blanco.
* Tarjetas limpias.
* Pocas líneas.
* Tipografía clara.
* Iconografía coherente.
* Colores utilizados solo para resaltar información.

---

# Componentes

El dashboard se construye a partir de componentes independientes.

Cada componente debe:

* Tener una única responsabilidad.
* Poder reutilizarse.
* Ser fácilmente reemplazable.
* Mantener una apariencia consistente con el resto del dashboard.

La documentación detallada de cada componente se encuentra en `components.md`.

---

# Evolución prevista

## V5.3.1

* Dashboard PRO Layout.
* Mejor jerarquía visual.
* Nuevas tarjetas.
* Mejor distribución.
* Primer rediseño importante.

## V5.4

* Nuevos gráficos.
* Más comparativas.
* Mejor responsive.
* Insights automáticos.

## V5.5

* Métricas avanzadas.
* Personal Records.
* Tendencias inteligentes.
* Comparador de periodos.

## V6

* Dashboard totalmente modular.
* Widgets configurables.
* Personalización por usuario.
* Nuevos paneles de análisis.

---

# Regla principal

Antes de añadir una nueva tarjeta al dashboard hay que responder:

1. ¿Aporta valor?
2. ¿Es fácil de entender?
3. ¿Evita duplicar información?
4. ¿Mantiene una interfaz limpia?
5. ¿Encaja con la filosofía del Dashboard PRO?

Si la respuesta es "no" en alguno de estos puntos, la funcionalidad debe replantearse antes de implementarla.
