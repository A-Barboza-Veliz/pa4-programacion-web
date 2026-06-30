# Gestión de Cursos e Inscripciones — Experiencia Integrada

Práctica Calificada 4 (PA4) — Programación Web Avanzada — Instituto San Ignacio de Loyola (ISIL)

Este repositorio contiene dos proyectos independientes, tal como exige la
consigna: un Portal del Estudiante en React y un módulo público en
Next.js, cada uno con su propio `package.json`, dependencias y ciclo de
build, conectados mediante enlaces entre apps.

```
pa4-separado/
├── portal-estudiante-react/   # SPA en React + Vite (login, cursos, detalle, sesión)
└── modulo-publico-nextjs/     # Next.js (inicio + catálogo público, SSR/SSG)
```

## ¿Por qué separados?

- **`portal-estudiante-react/`**: corre como SPA pura (React Router + Vite),
  sin Next.js. Maneja autenticación con token, rutas protegidas y consumo de
  la API REST del estudiante.
- **`modulo-publico-nextjs/`**: aplicación Next.js independiente, sin lógica
  de sesión, enfocada en exponer la oferta académica con SSR/SSG.

Cada carpeta es un proyecto Node independiente: se instala y se ejecuta por
separado (`npm install` / `npm run dev` dentro de cada una).

# Integrantes del proyecto PA4

| Integrante | Responsabilidad |
-------------|-----------------
| Kimberly Pujay Quispe | 100% |
| Alejandro Barboza Veliz | 100% |

## Tecnologías utilizadas

- React 19, React Router DOM, Vite (Portal del Estudiante)
- Next.js 15 (App Router), SSR + SSG (Módulo Público)
- TypeScript, Tailwind CSS v4
- Autenticación basada en token (JWT simulado)
- Git / GitHub

## Instalación y ejecución (ambos proyectos)

```bash
git clone https://github.com/<usuario>/<repositorio>.git
cd <repositorio>

# Portal del estudiante (React)
cd portal-estudiante-react
npm install
cp .env.example .env.local
npm run dev          # http://localhost:5173

# En otra terminal: módulo público (Next.js)
cd ../modulo-publico-nextjs
npm install
cp .env.example .env.local
npm run dev           # http://localhost:3000
```

## Variables de entorno

Ver `.env.example` dentro de cada proyecto. En resumen:

| Proyecto | Variable | Uso |
|---|---|---|
| React | `VITE_API_URL` | URL de la API de cursos/autenticación |
| React | `VITE_SITIO_PUBLICO_URL` | Enlace al módulo público Next.js |
| Next.js | `NEXT_PUBLIC_API_URL` | URL de la API de cursos (opcional, si no usa el JSON local) |
| Next.js | `NEXT_PUBLIC_PORTAL_ESTUDIANTE_URL` | Enlace al portal React |

## Build de producción (verificación)

```bash
cd portal-estudiante-react && npm run build   # genera dist/
cd ../modulo-publico-nextjs && npm run build  # genera .next/, pre-renderiza /cursos/[codigo]
```

## Funcionalidades por módulo

### Portal del estudiante (React) — `portal-estudiante-react/`
- Inicio de sesión con token simulado.
- Consumo de API REST (`fetch`).
- Listado y detalle de cursos.
- Rutas protegidas (`RutaProtegida`) y cierre de sesión.

### Módulo público (Next.js) — `modulo-publico-nextjs/`
- Página de inicio institucional.
- Catálogo de cursos (SSR).
- Detalle de curso por ruta dinámica, pre-generado con `generateStaticParams` (SSG).

## Evidencias y sustentación

- Repositorio: `<pegar enlace de GitHub>`
- Video de sustentación (YouTube): `<pegar enlace>`
- Capturas de funcionamiento: agregar en `/docs` o en este README antes de la entrega.

## Matriz de aportes

Completar antes de la entrega con el detalle real por integrante (ej. quién
trabajó el portal React, quién el módulo Next.js, quién la documentación).
