// app/cursos/page.tsx
// Catálogo público de cursos. Server Component que obtiene los datos en build
// time (SSG) gracias a que no usa cookies/headers dinámicos.
import Link from "next/link";
import { obtenerCursos } from "../../lib/cursos";

export default async function CursosPublicoPage() {
  const cursos = await obtenerCursos();

  return (
    <div className="visitante-container">
      <header className="visitante-header">
        <div className="visitante-header-content">
          <div className="visitante-logo">
            <span className="visitante-logo-icon">🎓</span>
            <span className="visitante-logo-text">ISIL - Oferta Académica</span>
          </div>
          <nav className="visitante-nav">
            <Link href="/" className="visitante-nav-link">Inicio</Link>
            <Link href="/cursos" className="visitante-nav-link active">Cursos</Link>
          </nav>
        </div>
      </header>

      <section className="visitante-cursos">
        <div className="visitante-cursos-header">
          <h2 className="visitante-section-title">📖 Nuestra Oferta Académica</h2>
          <p className="visitante-section-subtitle">
            Descubre los cursos que ofrecemos para tu formación profesional
          </p>
        </div>

        <div className="visitante-cursos-grid">
          {cursos.map((curso) => (
            <Link
              key={curso.id}
              href={`/cursos/${curso.codigo}`}
              className="visitante-curso-card"
            >
              <h3>{curso.nombre}</h3>
              <p>{curso.profesor}</p>
              <span>{curso.creditos} créditos</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
