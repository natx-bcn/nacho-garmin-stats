# Garmin Activities — Documentation

Documentación técnica y funcional del proyecto Garmin Activities.

## Punto de entrada recomendado

Empieza por:

```text
docs/01-project/project-context.md
```

Ese documento contiene la visión global del proyecto, arquitectura, estado actual, roadmap inicial, criterios de calidad y futuras mejoras.

## Estructura

```text
docs/
├── 01-project/        Visión, roadmap, changelog y decisiones
├── 02-architecture/   Arquitectura, flujo de datos, despliegue y stack
├── 03-data/           JSON Garmin, métricas, cálculos y récords
├── 04-frontend/       Dashboard, componentes, gráficas, tema y responsive
├── 05-backend/        GitHub Actions, sincronización, API futura y backend
├── 06-features/       Funcionalidades implementadas, planificadas e ideas
├── 07-development/    Reglas de desarrollo, comandos, releases y errores
└── assets/            Capturas, diagramas y recursos visuales
```

## Documentos principales

* `01-project/project-context.md`
* `01-project/vision.md`
* `01-project/roadmap.md`
* `01-project/changelog.md`
* `01-project/decisions.md`
* `02-architecture/architecture.md`
* `03-data/metrics.md`
* `04-frontend/dashboard.md`
* `07-development/troubleshooting.md`

## Regla básica

Antes de hacer push:

```bash
npm run build
```

Si el build falla en local, no se debe subir el cambio.

## Objetivo de la documentación

La documentación debe servir para:

* Retomar el proyecto rápidamente.
* Evitar perder decisiones importantes.
* Entender el dashboard.
* Documentar métricas y cálculos.
* Facilitar futuras mejoras.
* Mantener el proyecto limpio y profesional.
