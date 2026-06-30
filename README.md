# Garmin Stats

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-success)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![Node](https://img.shields.io/badge/Node.js-24-green)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)
![License](https://img.shields.io/badge/License-MIT-yellow)

Dashboard moderno para visualizar y analizar todas tus actividades de **Garmin Connect**.

El proyecto descarga automáticamente las actividades desde Garmin, genera un histórico en JSON y publica una web completamente estática mediante **GitHub Pages**.

---

# 🌍 Demo

## Producción

https://natx-bcn.github.io/nacho-garmin-stats/#/

---

# ✨ Características

- 📊 Dashboard de entrenamiento
- 🏃 Historial completo de actividades
- ❤️ Estadísticas de frecuencia cardíaca
- 🔥 Distribución por zonas
- 📈 Evolución de fitness
- ⚡ Análisis de rendimiento
- 🏅 Récords personales
- 🗺️ Mapas de actividades
- 🔄 Sincronización automática diaria
- 🚀 Publicación automática mediante GitHub Actions

---

# 🛠 Tecnologías

- Python 3.11+
- React
- TypeScript
- Vite
- Zustand
- Tailwind CSS
- GitHub Actions
- GitHub Pages

---

# 📦 Instalación

Clonar el proyecto

```bash
git clone https://github.com/natx-bcn/nacho-garmin-stats.git
cd nacho-garmin-stats
```

---

## Instalar dependencias Python

```bash
pip install -r fetch/requirements.txt
```

---

## Instalar dependencias Node

```bash
npm install
```

---

# 🔐 Configuración

Crear un archivo `.env` en la raíz del proyecto.

```env
GARMIN_EMAIL=tu_email
GARMIN_PASSWORD=tu_password
```

También puedes copiar el ejemplo:

```bash
cp .env.example .env
```

---

# 🔄 Sincronizar Garmin

## Descargar únicamente las últimas actividades

```bash
python fetch/sync.py --limit 30 --no-gpx
```

---

## Descargar todo el histórico

```bash
python fetch/sync.py --no-gpx
```

Todos los datos se guardan automáticamente en

```
public/data/
```

---

# 💻 Desarrollo

Arrancar el servidor local

```bash
npm run dev
```

Abrir

```
http://localhost:5173/
```

---

# 🏗 Build

```bash
npm run build
```

La versión compilada queda en

```
dist/
```

---

# ☁️ Despliegue

El despliegue es completamente automático mediante **GitHub Actions**.

Cada ejecución realiza:

1. Descarga las actividades nuevas de Garmin.
2. Mantiene el histórico existente.
3. Genera la aplicación.
4. Publica automáticamente en GitHub Pages.

Workflow:

```
.github/workflows/update-garmin.yml
```

---

# 🔑 GitHub Secrets

En el repositorio:

```
Settings
→ Secrets and variables
→ Actions
```

Crear los siguientes secrets:

```
GARMIN_EMAIL
GARMIN_PASSWORD
```

---

# 🌐 GitHub Pages

La aplicación se publica automáticamente en

```
https://natx-bcn.github.io/nacho-garmin-stats/#/
```

Ejemplos de navegación:

Dashboard

```
https://natx-bcn.github.io/nacho-garmin-stats/#/
```

Actividades

```
https://natx-bcn.github.io/nacho-garmin-stats/#/activities
```

Fitness

```
https://natx-bcn.github.io/nacho-garmin-stats/#/fitness
```

Rendimiento

```
https://natx-bcn.github.io/nacho-garmin-stats/#/performance
```

Récords

```
https://natx-bcn.github.io/nacho-garmin-stats/#/records
```

---

# 📁 Estructura

```
fetch/
    sync.py
    normalizer.py

public/
    data/

src/
    components/
    hooks/
    pages/
    stores/
    utils/

.github/
    workflows/

vite.config.ts
package.json
```

---

# 🚀 Roadmap

## Fase 1

- ✅ Sincronización incremental
- ✅ GitHub Pages
- ✅ GitHub Actions
- ✅ Historial persistente
- ✅ Publicación automática

## Próximas mejoras

- 📈 Dashboard avanzado
- 🧠 Coach inteligente
- ❤️ Fatiga y recuperación
- 🏃 Predicción de 5K / 10K / Media
- 📅 Calendario de entrenamiento
- 🥇 Evolución de récords
- 📊 Comparativas mensuales
- 🗺️ Heatmap mundial
- 📱 Diseño optimizado para móvil

---

# 📄 Licencia

MIT License

---

Desarrollado a partir del excelente proyecto original de **RafaTatay**, ampliado con nuevas funcionalidades, despliegue automático mediante GitHub Actions y publicación en GitHub Pages.