# Garmin Activities - Documentation

Esta carpeta contiene únicamente la documentación necesaria para desarrollar y evolucionar el dashboard de Garmin Activities.

El objetivo **no es documentar todo el proyecto**, sino disponer del contexto suficiente para poder seguir desarrollando nuevas funcionalidades sin tener que volver a analizar el código en cada conversación.

## Estructura

```text
docs/
│
├── dashboard/
│   ├── dashboard.md      # Visión general del dashboard
│   ├── layout.md         # Distribución visual y estructura
│   └── components.md     # Descripción de todos los componentes
│
├── data/
│   ├── stats-json.md     # Estructura del stats.json
│   └── metrics.md        # Métricas y cálculos utilizados
│
└── roadmap/
    ├── ideas.md          # Ideas para el futuro
    └── next-steps.md     # Próximos desarrollos
```

## Orden recomendado

Cuando retomemos el proyecto, el orden será:

1. `dashboard/dashboard.md`
2. `dashboard/layout.md`
3. `dashboard/components.md`
4. `data/stats-json.md`
5. `data/metrics.md`
6. `roadmap/next-steps.md`

Con esos documentos tendremos todo el contexto necesario para continuar desarrollando el dashboard sin revisar nuevamente todo el código.

## Filosofía

La documentación debe ser:

* Breve.
* Actualizada.
* Fácil de leer.
* Orientada al desarrollo.
* Sin duplicar información del código.

Si una explicación ocupa más de unas pocas líneas, probablemente debería estar en el propio código y no en esta documentación.
