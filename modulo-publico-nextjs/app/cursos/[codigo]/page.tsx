// app/cursos/[codigo]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerCursos, obtenerCursoPorCodigo } from "../../../lib/cursos";

// Genera las rutas estáticas en build time (SSG) para cada curso público.
export async function generateStaticParams() {
  const cursos = await obtenerCursos();
  return cursos.map((curso) => ({ codigo: curso.codigo }));
}

export default async function DetalleCursoPublicoPage({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;
  const curso = await obtenerCursoPorCodigo(codigo);

  if (!curso) notFound();

  return (
    <div className="detalle-container">
      <h1 className="detalle-titulo">{curso.nombre}</h1>
      <p className="detalle-descripcion">
        <strong>Descripción:</strong> {curso.descripcion}
      </p>
      <p className="detalle-info">
        <strong>Importancia:</strong>{" "}
        <span
          className={`detalle-badge ${
            curso.importancia === "Alta" ? "detalle-badge-alta" : "detalle-badge-media"
          }`}
        >
          {curso.importancia}
        </span>
      </p>
      <p className="detalle-info">
        <strong>Precio:</strong> <span className="detalle-precio">${curso.precio}</span>
      </p>
      <p className="detalle-info">
        <strong>Profesor:</strong> {curso.profesor}
      </p>
      <Link href="/cursos" className="detalle-btn-volver">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
