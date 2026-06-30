# Módulo Público (Next.js)

Sitio público de Gestión de Cursos e Inscripciones, dirigido a visitantes
no autenticados: página de inicio, catálogo de cursos y detalle dinámico de
cada curso. No incluye login ni vistas protegidas (eso vive en el Portal del
Estudiante, construido en React).

## Tecnologías
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Renderizado: SSR en `/` y `/cursos`; SSG con `generateStaticParams` en
  `/cursos/[codigo]`.

## Estructura
```
modulo-publico-nextjs/
├── app/
│   ├── page.tsx                # Inicio (SSR)
│   ├── cursos/page.tsx         # Catálogo (SSR, listo para ISR)
│   ├── cursos/[codigo]/page.tsx  # Detalle (SSG vía generateStaticParams)
│   └── layout.tsx
├── lib/cursos.ts               # Acceso a datos (API externa o JSON local)
├── public/cursos.json
└── .env.example
```

## Variables de entorno
Copiar `.env.example` a `.env.local`:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL de la API REST de cursos. Si se omite, se usa `public/cursos.json` como fuente para SSG. |
| `NEXT_PUBLIC_PORTAL_ESTUDIANTE_URL` | URL del Portal del Estudiante en React (botón "Iniciar sesión"). |

## Instalación y ejecución
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build de producción
```bash
npm run build
npm run start
```

Durante `next build`, `/cursos/[codigo]` se pre-genera de forma estática para
cada curso definido en `cursos.json` (o en la API), evidenciando el uso de
SSG sobre rutas dinámicas.
