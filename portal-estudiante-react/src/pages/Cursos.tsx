// pages/Cursos.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerCursos, Curso } from "../api/cursosApi";
import { useSession } from "../context/SessionContext";

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useSession();

  useEffect(() => {
    obtenerCursos()
      .then((data) => {
        setCursos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los cursos.");
        setCargando(false);
      });
  }, []);

  return (
    <div className="cursos-layout">
      <nav className="cursos-nav">
        <span className="cursos-nav-brand">Portal del Estudiante</span>
        <button className="cursos-btn-exit" onClick={logout}>
          Salir
        </button>
      </nav>

      <main className="cursos-main-container">
        <h1 className="cursos-title">Lista de Cursos</h1>

        {cargando && <p>Cargando cursos...</p>}
        {error && <p className="login-msg-error">{error}</p>}

        {!cargando && !error && (
          <table className="cursos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre del Curso</th>
                <th>Créditos</th>
                <th>Profesor</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id}>
                  <td className="cursos-td-code">{curso.codigo}</td>
                  <td>
                    <Link to={`/detalle/${curso.codigo}`}>{curso.nombre}</Link>
                  </td>
                  <td>{curso.creditos}</td>
                  <td>{curso.profesor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
