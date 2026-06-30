// pages/Detalle.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerCursoPorCodigo, Curso } from "../api/cursosApi";

export default function Detalle() {
  const { codigo } = useParams();
  const [curso, setCurso] = useState<Curso | null | undefined>(undefined);

  useEffect(() => {
    if (!codigo) return;
    obtenerCursoPorCodigo(codigo).then((found) => setCurso(found ?? null));
  }, [codigo]);

  if (curso === undefined) {
    return <p className="detalle-loading-text">Cargando información del curso...</p>;
  }

  if (curso === null) {
    return (
      <div className="detalle-container">
        <p>Curso no encontrado.</p>
        <Link to="/cursos" className="detalle-btn-volver">
          ← Volver al listado
        </Link>
      </div>
    );
  }

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
      <Link to="/cursos" className="detalle-btn-volver">
        ← Volver al listado
      </Link>
    </div>
  );
}
