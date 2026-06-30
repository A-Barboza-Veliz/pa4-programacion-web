// api/cursosApi.ts
// Consumo de la API REST (o datos estáticos servidos como API) desde el Portal del Estudiante.

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

const API_URL = import.meta.env.VITE_API_URL ?? "";

export const obtenerCursos = async (): Promise<Curso[]> => {
  // Si existe una API_URL configurada se usa esa; si no, se hace fallback al
  // archivo estático local (útil para demo sin backend).
  const endpoint = API_URL ? `${API_URL}/cursos` : "/cursos.json";
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Error al obtener los cursos");
  }
  return response.json();
};

export const obtenerCursoPorCodigo = async (codigo: string): Promise<Curso | undefined> => {
  const cursos = await obtenerCursos();
  return cursos.find((c) => c.codigo === codigo);
};
