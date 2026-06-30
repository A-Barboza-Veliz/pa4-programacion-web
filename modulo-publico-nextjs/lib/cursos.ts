// lib/cursos.ts
// Helper de datos para el módulo público. Lee desde la API externa si está
// configurada (NEXT_PUBLIC_API_URL), o desde el JSON estático del proyecto
// como fuente para Server-Side Rendering / Static Generation.

import { promises as fs } from "fs";
import path from "path";

export type Curso = {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  profesor: string;
  descripcion: string;
  importancia: string;
  precio: number;
};

export async function obtenerCursos(): Promise<Curso[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    const res = await fetch(`${apiUrl}/cursos`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Error al obtener los cursos desde la API");
    return res.json();
  }

  const filePath = path.join(process.cwd(), "public", "cursos.json");
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export async function obtenerCursoPorCodigo(codigo: string): Promise<Curso | undefined> {
  const cursos = await obtenerCursos();
  return cursos.find((c) => c.codigo === codigo);
}
